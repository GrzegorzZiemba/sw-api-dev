import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class VehiclesCache {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleId: string;

  @Column('json')
  data: any;

  @Column()
  lastFetched: Date;
}
