import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarshipCache } from './starship-cache.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StarshipCache])],
  providers: [StarshipsService],
  controllers: [StarshipsController],
})
export class StarshipsModule {}
