import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PlanetsService } from './planets.service';
import { Planet } from './planet.model';

@Resolver(of => Planet)
export class PlanetResolver {
  constructor(private planetsService: PlanetsService) {}

  @Query(returns => [Planet])
  async planets(@Args('page', { type: () => Int, nullable: true }) page: number): Promise<Planet[]> {
    return this.planetsService.findAll(page);
  }
}
