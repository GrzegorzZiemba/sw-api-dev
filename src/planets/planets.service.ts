import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanetCache } from './planet-cache.entity';
import { Planet } from './planet.model';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(PlanetCache)
    private planetCacheRepository: Repository<PlanetCache>,
  ) {}

  async findAll(page: number = 1): Promise<Planet[]> {
    const cacheKey = `planets-page-${page}`;

    const cachedData = await this.planetCacheRepository.findOne({ where: { key: cacheKey } });
    if (cachedData && (new Date().getTime() - new Date(cachedData.lastFetched).getTime()) < 24 * 3600 * 1000) {
      return cachedData.data;
    }

    try {
      const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
      const planets = response.data.results.map(planetData => this.mapToPlanetModel(planetData));

      await this.planetCacheRepository.save({
        key: cacheKey,
        data: planets,
        lastFetched: new Date(),
      });

      return planets;
    } catch (error) {
      throw new HttpException('Error fetching planets', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private mapToPlanetModel(planetData): Planet {
    return {
      name: planetData.name,
      climate: planetData.climate,
      terrain: planetData.terrain,
    };
  }
}
