import { ApiProperty } from '@nestjs/swagger';

export class StarshipDto {
  @ApiProperty({ description: 'Name of the starship' })
  name: string;

  @ApiProperty({ description: 'Model of the starship' })
  model: string;

}
