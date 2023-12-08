import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SpeciesCache {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  speciesId: string;

  @Column('json')
  data: any;

  @Column()
  lastFetched: Date;
}
