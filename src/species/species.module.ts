import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { SpeciesCache } from './species-cache.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesCache])],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}
