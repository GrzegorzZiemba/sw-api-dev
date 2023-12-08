import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { StarshipsService } from './starships.service';
import { StarshipDto } from './starship.dto';

@ApiTags('starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of starships' })
  @ApiResponse({ status: 200, description: 'Returns a list of starships', type: [StarshipDto] })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  findAll(@Query('page') page?: number): Promise<StarshipDto[]> {
    return this.starshipsService.findAll(page).then(starships =>
      starships.map(starship => ({...starship} as StarshipDto))
    );
  }
}
