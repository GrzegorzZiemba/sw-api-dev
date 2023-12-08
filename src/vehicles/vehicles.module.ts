import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesCache } from './vehicles-cache.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehiclesCache])],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
