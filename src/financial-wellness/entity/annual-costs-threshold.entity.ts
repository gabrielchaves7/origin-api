import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { ScoreStatus } from './score.entity';

@Entity()
export class AnnualCostsThreshold {
  @PrimaryColumn({
    type: 'enum',
    enum: ScoreStatus,
  })
  status: ScoreStatus;

  @Column()
  min: string;

  @Column()
  max: string;
}
