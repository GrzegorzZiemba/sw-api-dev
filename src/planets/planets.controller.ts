import { Controller, Get, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PlanetDto } from './planet.dto';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of planets' })
  @ApiResponse({ status: 200, description: 'Returns a list of planets', type: [PlanetDto] })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  findAll(@Query('page') page?: number): Promise<PlanetDto[]> {
    return this.planetsService.findAll(page);
  }
}
