import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StarshipCache {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column('json')
  data: any;

  @Column()
  lastFetched: Date;
}
