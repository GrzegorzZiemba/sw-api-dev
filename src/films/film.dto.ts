import { ApiProperty } from '@nestjs/swagger';

export class FilmDto {
  @ApiProperty({ description: 'Film ID' })
  id: string;

  @ApiProperty({ description: 'Title' })
  title: string;

  @ApiProperty({ description: 'Opening Crawl' })
  openingCrawl: string;

}