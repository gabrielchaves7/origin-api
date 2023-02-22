import { Injectable, Dependencies, Inject } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Tax, TaxEnum } from '../../tax/entity/tax.entity';
import { TaxService } from '../../tax/service/tax.service';
import { Repository } from 'typeorm';
import { Score, ScoreStatus } from '../entity/score.entity';

@Injectable()
@Dependencies(getRepositoryToken(Score))
export class FinancialWellnessService {
  scoreRepository: Repository<Score>;
  taxService: TaxService;

  constructor(
    @InjectRepository(Score) scoreRepository: Repository<Score>,
    @Inject(TaxService) taxService: TaxService,
  ) {
    this.scoreRepository = scoreRepository;
    this.taxService = taxService;
  }

  async score(annualIncome: number, monthlyCosts: number): Promise<Score> {
    const tax: Tax = await this.taxService.getTax(TaxEnum.ANNUAL_TAX);
    var annualCosts = monthlyCosts * 12;
    var annualNetCompensation = annualIncome - (annualIncome * tax.value) / 100;
    var annualCostsPercentage = (annualCosts * 100) / annualNetCompensation;

    var status = ScoreStatus.MEDIUM;
    if (annualCostsPercentage <= 25) {
      status = ScoreStatus.HEALTHY;
    } else if (annualCostsPercentage > 75) {
      status = ScoreStatus.LOW;
    }

    var newScore = this.scoreRepository.create({
      monthlyCosts,
      annualIncome,
      status,
    });
    this.scoreRepository.save(newScore);

    return newScore;
  }
}
