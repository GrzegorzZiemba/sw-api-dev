import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Species } from './species.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { SpeciesCache } from './species-cache.entity';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(SpeciesCache)
    private speciesCacheRepository: Repository<SpeciesCache>,
  ) {}

  async findAll(page: number = 1): Promise<Species[]> {
    try {
      const cacheKey = `species-page-${page}`;
      const cached = await this.speciesCacheRepository.findOne({ where: { speciesId: cacheKey } });

      if (cached && (new Date().getTime() - new Date(cached.lastFetched).getTime()) < 24 * 3600 * 1000) {
        return cached.data;
      }

      const response = await axios.get(`https://swapi.dev/api/species/?page=${page}`);
      const speciesData = response.data.results.map(species => {
        return {
          id: species.url.match(/\/(\d+)\/$/)[1], 
          ...species
        };
      });

      await this.speciesCacheRepository.save({
        speciesId: cacheKey,
        data: speciesData,
        lastFetched: new Date(),
      });

      return speciesData;
    } catch (error) {
        console.error('Error fetching species from SWAPI:', error);
        throw new HttpException('Error fetching species', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneById(id: number): Promise<Species> {
    try {
      const cacheKey = `species-${id}`;
      const cached = await this.speciesCacheRepository.findOne({ where: { speciesId: cacheKey } });

      if (cached && (new Date().getTime() - new Date(cached.lastFetched).getTime()) < 24 * 3600 * 1000) {
        return cached.data;
      }

      const response = await axios.get(`https://swapi.dev/api/species/${id}/`);
      const species = {
        id: response.data.url.match(/\/(\d+)\/$/)[1], 
        ...response.data
      };

      await this.speciesCacheRepository.save({
        speciesId: cacheKey,
        data: species,
        lastFetched: new Date(),
      });

      return species;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Species with ID ${id} not found`);
      }
      throw new HttpException('Error fetching species', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
