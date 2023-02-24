import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum ScoreStatus {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HEALTHY = 'HEALTHY',
}

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  annualIncome: number;

  @Column()
  monthlyCosts: number;

  @Column({
    type: 'enum',
    enum: ScoreStatus,
    default: ScoreStatus.LOW,
  })
  status: ScoreStatus;

  constructor({annualIncome, monthlyCosts, status}) {
    this.annualIncome = annualIncome;
    this.monthlyCosts = monthlyCosts;
    this.status = status;
  }
}
