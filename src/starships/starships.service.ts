import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StarshipCache } from './starship-cache.entity';
import { Starship } from './starship.model';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(StarshipCache)
    private starshipCacheRepository: Repository<StarshipCache>,
  ) {}

  async findAll(page: number = 1): Promise<Starship[]> {
    const cacheKey = `starships-page-${page}`;

    const cachedData = await this.starshipCacheRepository.findOne({ where: { key: cacheKey } });
    if (cachedData && (new Date().getTime() - new Date(cachedData.lastFetched).getTime()) < 24 * 3600 * 1000) {
      return cachedData.data;
    }

    try {
      const response = await axios.get(`https://swapi.dev/api/starships/?page=${page}`);
      const starships = response.data.results.map(starshipData => this.mapToStarship(starshipData));

      await this.starshipCacheRepository.save({
        key: cacheKey,
        data: starships,
        lastFetched: new Date(),
      });

      return starships;
    } catch (error) {
      throw new HttpException('Error fetching starships', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private mapToStarship(starshipData): Starship {
    return {
      name: starshipData.name,
      model: starshipData.model,
    };
  }
}
