import { ApiProperty } from '@nestjs/swagger';

export class PlanetDto {
  @ApiProperty({ description: 'Name of the planet' })
  name: string;

  @ApiProperty({ description: 'Climate of the planet' })
  climate: string;

  @ApiProperty({ description: 'Terrain of the planet' })
  terrain: string;

}
