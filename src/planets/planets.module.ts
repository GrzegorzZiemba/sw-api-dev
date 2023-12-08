import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { PlanetResolver } from './planet.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetCache } from './planet-cache.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanetCache])],
  providers: [PlanetsService, PlanetResolver],
  controllers: [PlanetsController], 
})
export class PlanetsModule {}
