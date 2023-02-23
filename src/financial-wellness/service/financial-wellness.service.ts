import { Injectable, Dependencies, Inject } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Tax, TaxEnum } from '../../tax/entity/tax.entity';
import { TaxService } from '../../tax/service/tax.service';
import { Repository } from 'typeorm';
import { Score, ScoreStatus } from '../entity/score.entity';
import { AnnualCostsThreshold } from '../entity/annual-costs-threshold.entity';

@Injectable()
@Dependencies(getRepositoryToken(Score))
export class FinancialWellnessService {
  scoreRepository: Repository<Score>;
  annualCostsThresholdRepository: Repository<AnnualCostsThreshold>;
  taxService: TaxService;

  constructor(
    @InjectRepository(Score) scoreRepository: Repository<Score>,
    @InjectRepository(AnnualCostsThreshold)
    annualCostsThresholdRepository: Repository<AnnualCostsThreshold>,
    @Inject(TaxService) taxService: TaxService,
  ) {
    this.scoreRepository = scoreRepository;
    this.taxService = taxService;
    this.annualCostsThresholdRepository = annualCostsThresholdRepository;
  }

  async score(annualIncome: number, monthlyCosts: number): Promise<Score> {
    const tax: Tax = await this.taxService.getTax(TaxEnum.ANNUAL_TAX);
    const thresholds = await this.annualCostsThresholdRepository.find();
    var annualCosts = monthlyCosts * 12;
    var annualNetCompensation = annualIncome - (annualIncome * tax.value) / 100;
    var annualCostsPercentage = (annualCosts * 100) / annualNetCompensation;

    var annualCostsThreshold: AnnualCostsThreshold = thresholds.find(
      (threshold) =>
        annualCostsPercentage <= +threshold.max &&
        annualCostsPercentage > +threshold.min,
    );

    var newScore = this.scoreRepository.create({
      monthlyCosts,
      annualIncome,
      status: annualCostsThreshold.status,
    });
    this.scoreRepository.save(newScore);

    return newScore;
  }
}


