import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { VehiclesCache } from './vehicles-cache.entity';
import { Vehicle } from './vehicle.model';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(VehiclesCache)
    private vehiclesCacheRepository: Repository<VehiclesCache>,
  ) {}

  async findAll(page: number = 1): Promise<Vehicle[]> {
    try {
      const cacheKey = `vehicles-page-${page}`;
      const cached = await this.vehiclesCacheRepository.findOne({ where: { vehicleId: cacheKey } });

      if (cached && (new Date().getTime() - new Date(cached.lastFetched).getTime()) < 24 * 3600 * 1000) {
        return cached.data;
      }

      const response = await axios.get(`https://swapi.dev/api/vehicles/?page=${page}`);
      const vehiclesData = response.data.results.map(vehicle => {
        return {
          id: vehicle.url.match(/\/(\d+)\/$/)[1], // Extracting ID from URL
          ...vehicle
        };
      });

      await this.vehiclesCacheRepository.save({
        vehicleId: cacheKey,
        data: vehiclesData,
        lastFetched: new Date(),
      });

      return vehiclesData;
    } catch (error) {
      throw new HttpException('Error fetching vehicles', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

 
}
