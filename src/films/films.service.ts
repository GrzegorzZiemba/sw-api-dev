import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Film } from './film.model';
import { FilmCache } from './film-cache.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(FilmCache)
    private filmCacheRepository: Repository<FilmCache>,
  ) {}

  /**
   * Analyzes opening crawls of all films and counts the occurrences of each word.
   * @returns A promise that resolves to an array of word counts.
   */
  async analyzeOpeningCrawls(): Promise<any[]> {
    try {
      // Fetching films data from SWAPI
      const response = await axios.get('https://swapi.dev/api/films/');
      const films = response.data.results;

      const wordCounts = {};
      films.forEach(film => {
        // Splitting the opening crawl into words and counting each occurrence
        const words = film.opening_crawl.replace(/[\r\n]+/g, ' ').split(' ');
        words.forEach(word => {
          const cleanedWord = word.trim().toLowerCase();
          if (cleanedWord) {
            wordCounts[cleanedWord] = (wordCounts[cleanedWord] || 0) + 1;
          }
        });
      });

      return Object.entries(wordCounts);
    } catch (error) {
      throw new HttpException('Error fetching films', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Finds the most frequently appearing character in all film opening crawls.
   * @returns A promise that resolves to an array of the most frequent character names.
   */
  async findMostFrequentCharacterInCrawls(): Promise<string[]> {
    try {
      // Fetching characters data from SWAPI
      let page = 1;
      let characters = [];
      let nextPage = true;
      while (nextPage) {
        const peopleResponse = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
        characters = characters.concat(peopleResponse.data.results);
        nextPage = peopleResponse.data.next !== null;
        page++;
      }

      // Analyzing each character's occurrence in film opening crawls
      const filmsResponse = await axios.get('https://swapi.dev/api/films/');
      const films = filmsResponse.data.results;
      const characterCounts = {};
      characters.forEach(character => {
        let count = 0;
        films.forEach(film => {
          if (film.opening_crawl.includes(character.name)) {
            count++;
          }
        });
        characterCounts[character.name] = count;
      });

      // Finding the most frequent character
      const countsArray = Object.values(characterCounts).map(value => Number(value));
      const maxCount = Math.max(...countsArray);
      return Object.keys(characterCounts).filter(name => characterCounts[name] === maxCount);
    } catch (error) {
      throw new HttpException('Error fetching data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Retrieves a film by its ID, either from cache or SWAPI if not cached.
   * @param id - The ID of the film.
   * @returns A promise that resolves to the film data.
   */
  async findOneById(id: number): Promise<Film> {
    try {
      const cacheKey = `film-${id}`;
      const cached = await this.filmCacheRepository.findOne({ where: { filmId: cacheKey } });
      if (cached && (new Date().getTime() - new Date(cached.lastFetched).getTime()) < 24 * 3600 * 1000) {
        return cached.data;
      }

      // Fetching film data from SWAPI if not in cache
      const response = await axios.get(`https://swapi.dev/api/films/${id}/`);
      const filmData = response.data;
      const film: Film = {
        id: filmData.episode_id,
        title: filmData.title,
        openingCrawl: filmData.opening_crawl,
      };

      // Caching the film data
      await this.filmCacheRepository.save({
        filmId: cacheKey,
        data: film,
        lastFetched: new Date(),
      });

      return film;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Film with ID ${id} not found`);
      }
      throw new HttpException('Error fetching film', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Retrieves a list of films, optionally filtered by title and paginated.
   * @param page - The page number for pagination.
   * @param title - The title to filter films by.
   * @returns A promise that resolves to an array of films.
   */
  async findAll(page: number = 1, title?: string): Promise<Film[]> {
    try {
      const cacheKey = `films-page-${page}-title-${title}`;
      const cached = await this.filmCacheRepository.findOne({ where: { filmId: cacheKey } });
      if (cached && (new Date().getTime() - new Date(cached.lastFetched).getTime()) < 24 * 3600 * 1000) {
        return cached.data;
      }

      // Fetching and optionally filtering films data from SWAPI
      let query = `https://swapi.dev/api/films/?page=${page}`;
      const response = await axios.get(query);
      let films = response.data.results.map(filmData => ({
        id: filmData.episode_id,
        title: filmData.title,
        openingCrawl: filmData.opening_crawl,
      }));

      if (title) {
        films = films.filter(film => film.title.includes(title));
      }

      // Caching the films data
      await this.filmCacheRepository.save({
        filmId: cacheKey,
        data: films,
        lastFetched: new Date(),
      });

      return films;
    } catch (error) {
      throw new HttpException('Error fetching films', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
