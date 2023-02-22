import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score, ScoreStatus } from '../entity/score.entity';

@Injectable()
@Dependencies(getRepositoryToken(Score))
export class FinancialWellnessService {
  scoreRepository: Repository<Score>;

  constructor(@InjectRepository(Score) scoreRepository: Repository<Score>) {
    this.scoreRepository = scoreRepository;
  }

  get(annualIncome: number, monthlyCosts: number) {

    const tax = 8;
    var annualCosts = monthlyCosts * 12;
    var annualNetCompensation = annualIncome - ((annualIncome * tax) / 100);
    var annualCostsPercentage = ((annualCosts * 100) / annualNetCompensation);

    var status = ScoreStatus.MEDIUM;
    if (annualCostsPercentage <= 25) {
      status = ScoreStatus.HEALTHY;
    } else if (annualCostsPercentage > 75) {
      status = ScoreStatus.LOW;
    }

    var newScore = this.scoreRepository.create({ monthlyCosts, annualIncome, status });
    this.scoreRepository.save(newScore);

    return newScore;
  }
}
