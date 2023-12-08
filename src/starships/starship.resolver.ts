import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Starship } from './starship.model';
import { StarshipsService } from './starships.service';

@Resolver(of => Starship)
export class StarshipResolver {
  constructor(private starshipsService: StarshipsService) {}

  @Query(returns => [Starship])
  async starships(@Args('page', { type: () => Int, nullable: true }) page: number): Promise<Starship[]> {
    return this.starshipsService.findAll(page);
  }
}
