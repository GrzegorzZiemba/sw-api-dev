import { ApiProperty } from '@nestjs/swagger';

export class VehicleDto {
  @ApiProperty({ description: 'Name of the vehicle' })
  name: string;

  @ApiProperty({ description: 'Model of the vehicle' })
  model: string;

  @ApiProperty({ description: 'Manufacturer of the vehicle' })
  manufacturer: string;

  @ApiProperty({ description: 'Cost of the vehicle in credits' })
  cost_in_credits: string;

  @ApiProperty({ description: 'Length of the vehicle' })
  length: string;

  @ApiProperty({ description: 'Maximum speed of the vehicle' })
  max_atmosphering_speed: string;

  @ApiProperty({ description: 'Number of crew required for the vehicle' })
  crew: string;

  @ApiProperty({ description: 'Number of passengers the vehicle can carry' })
  passengers: string;

}
