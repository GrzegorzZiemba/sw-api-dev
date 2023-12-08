import { Controller, Get, Query, Param } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { VehicleDto } from './vehicle.dto'; // Import klasy DTO

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of vehicles' })
  @ApiResponse({ status: 200, description: 'Returns a list of vehicles', type: [VehicleDto] }) // Użyj klasy DTO w odpowiedzi
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  findAll(@Query('page') page?: number): Promise<VehicleDto[]> { // Zwraca tablicę DTO
    return this.vehiclesService.findAll(page).then(vehicles => 
      vehicles.map(vehicle => ({...vehicle} as VehicleDto))
    );
  }
}
