import { Controller, Get, Query, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { FilmDto } from './film.dto';

@ApiTags('films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('/analyze-crawls')
  @ApiOperation({ summary: 'Analyze opening crawls of all films' })
  @ApiResponse({ status: 200, description: 'Returns the analysis of the opening crawls' })
  analyzeOpeningCrawls(): Promise<any[]> {
    return this.filmsService.analyzeOpeningCrawls();
  }

  @Get('/most-frequent-character')
  @ApiOperation({ summary: 'Find the character that appears most frequently in all opening crawls' })
  @ApiResponse({ status: 200, description: 'Returns the name of the character' })
  async findMostFrequentCharacterInCrawls() {
    return await this.filmsService.findMostFrequentCharacterInCrawls();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a film by its ID' })
  @ApiResponse({ status: 200, description: 'Returns the film', type: FilmDto })
  @ApiResponse({ status: 404, description: 'Film not found' })
  findOneById(@Param('id') id: number): Promise<FilmDto> {
    return this.filmsService.findOneById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of films' })
  @ApiResponse({ status: 200, description: 'Returns a list of films', type: [FilmDto] })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'title', required: false, type: String, description: 'Filter by film title' })
  findAll(@Query('page') page?: number, @Query('title') title?: string): Promise<FilmDto[]> {
    return this.filmsService.findAll(page, title);
  }
}
