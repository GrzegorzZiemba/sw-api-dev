import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Film } from './film.model';
import { FilmsService } from './films.service';

@Resolver(of => Film)
export class FilmResolver {
  constructor(private filmsService: FilmsService) {}

  @Query(returns => Film)
  async film(@Args('id', { type: () => Int }) id: number): Promise<Film> {
    return this.filmsService.findOneById(id);
  }

  @Query(returns => [Film])
async films(
  @Args('page', { type: () => Int, nullable: true }) page: number,
  @Args('title', { type: () => String, nullable: true }) title: string,
): Promise<Film[]> {
  return this.filmsService.findAll(page, title);
}

}