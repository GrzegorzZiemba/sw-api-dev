import { Module } from '@nestjs/common';
import { FilmResolver } from './film.resolver';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmCache } from './film-cache.entity'; 
import { FilmsController } from './films.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FilmCache])], 
  providers: [FilmResolver, FilmsService], controllers: [FilmsController],
})
export class FilmsModule {}
