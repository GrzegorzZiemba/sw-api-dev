import { Controller, Get, Query, Param } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SpeciesDto } from './species.dto';

@ApiTags('species')
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a species by its ID' })
  @ApiResponse({ status: 200, description: 'Returns the species', type: SpeciesDto })
  @ApiResponse({ status: 404, description: 'Species not found' })
  findOneById(@Param('id') id: number): Promise<SpeciesDto> {
    return this.speciesService.findOneById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of species' })
  @ApiResponse({ status: 200, description: 'Returns a list of species', type: [SpeciesDto] })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  findAll(@Query('page') page?: number): Promise<SpeciesDto[]> {
    return this.speciesService.findAll(page);
  }
}
