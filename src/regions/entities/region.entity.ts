import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Region {
  @PrimaryGeneratedColumn('increment')
  regionId: number;

  @Column({ type: 'text', unique: true })
  regionName: string;

  @Column({ type: 'text', array: true })
  regionState: string[];
}
