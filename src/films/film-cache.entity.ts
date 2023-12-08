import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FilmCache {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filmId: string;

  @Column('json')
  data: any;

  @Column()
  lastFetched: Date;
}
