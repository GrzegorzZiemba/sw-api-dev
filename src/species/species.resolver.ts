import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Species } from './species.model';
import { SpeciesService } from './species.service';

@Resolver(of => Species)
export class SpeciesResolver {
  constructor(private speciesService: SpeciesService) {}

  @Query(returns => Species)
  async species(@Args('id', { type: () => Int }) id: number): Promise<Species> {
    return this.speciesService.findOneById(id);
  }

  @Query(returns => [Species])
  async allSpecies(
    @Args('page', { type: () => Int, nullable: true }) page: number,
  ): Promise<Species[]> {
    return this.speciesService.findAll(page);
  }
}
