import { ApiProperty } from '@nestjs/swagger';

export class SpeciesDto {
  @ApiProperty({ description: 'Species ID' })
  id: string;

  @ApiProperty({ description: 'Name' })
  name: string;

  @ApiProperty({ description: 'Classification' })
  classification: string;

  @ApiProperty({ description: 'Designation' })
  designation: string;

  @ApiProperty({ description: 'Average height' })
  average_height: string;

  @ApiProperty({ description: 'Skin colors' })
  skin_colors: string;

  @ApiProperty({ description: 'Hair colors' })
  hair_colors: string;

  @ApiProperty({ description: 'Eye colors' })
  eye_colors: string;

  @ApiProperty({ description: 'Average lifespan' })
  average_lifespan: string;

  @ApiProperty({ description: 'Language' })
  language: string;
}
