import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmCache } from './films/film-cache.entity'; 
import { SpeciesModule } from './species/species.module';
import { SpeciesCache } from './species/species-cache.entity';
import { VehiclesModule } from './vehicles/vehicles.module';
import { VehiclesCache } from './vehicles/vehicles-cache.entity';
import { StarshipsModule } from './starships/starships.module';
import { StarshipCache } from './starships/starship-cache.entity';
import { PlanetsModule } from './planets/planets.module';
import { PlanetCache } from './planets/planet-cache.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    FilmsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite', 
      database: 'sqllite.db', 
      entities: [FilmCache, SpeciesCache, VehiclesCache, StarshipCache, PlanetCache], 
      synchronize: true, 
    }),
    SpeciesModule,
    VehiclesModule,
    StarshipsModule,
    PlanetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
