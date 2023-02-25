import { Injectable, Dependencies, Inject } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tax, TaxEnum } from '../../tax/entity/tax.entity';
import { TaxService } from '../../tax/service/tax.service';
import { Score, ScoreStatus } from '../entity/score.entity';
import { AnnualCostsThreshold } from '../entity/annual-costs-threshold.entity';
import { ScoreDataSource } from '../datasource/score.datasource';
import { AnnualCostsThresholdDataSource } from '../datasource/annual-costs-threshold.datasource';

@Injectable()
@Dependencies(getRepositoryToken(Score))
export class ScoreService {
  annualCostsThresholdDataSource: AnnualCostsThresholdDataSource;
  taxService: TaxService;
  scoreDataSource: ScoreDataSource;

  constructor(
    @Inject(AnnualCostsThresholdDataSource)
    annualCostsThresholdDataSource: AnnualCostsThresholdDataSource,
    @Inject(TaxService) taxService: TaxService,
    @Inject(ScoreDataSource) scoreDataSource: ScoreDataSource,
  ) {
    this.taxService = taxService;
    this.annualCostsThresholdDataSource = annualCostsThresholdDataSource;
    this.scoreDataSource = scoreDataSource;
  }

  async post(annualIncome: number, monthlyCosts: number): Promise<Score> {
    const tax: Tax = await this.taxService.findOne(TaxEnum.ANNUAL_TAX);
    const thresholds = await this.annualCostsThresholdDataSource.find();
    const annualCostsPercentage = this._getAnnualCostsPercentage(
      annualIncome,
      monthlyCosts,
      tax,
    );

    const annualCostsThreshold: AnnualCostsThreshold =
      this._getAnnualCostsThreshold(thresholds, annualCostsPercentage);

    return await this._saveNewScore(
      annualIncome,
      monthlyCosts,
      annualCostsThreshold.status,
    );
  }

  async _saveNewScore(
    annualIncome: number,
    monthlyCosts: number,
    status: ScoreStatus,
  ) {
    const newScore = new Score();
    newScore.annualIncome = annualIncome;
    newScore.monthlyCosts = monthlyCosts;
    newScore.status = status;
    await this.scoreDataSource.save(newScore);

    return newScore;
  }

  _getAnnualCostsPercentage(
    annualIncome: number,
    monthlyCosts: number,
    tax: Tax,
  ): number {
    const annualCosts = monthlyCosts * 12;
    const annualNetCompensation =
      annualIncome - (annualIncome * tax.value) / 100;
    const annualCostsPercentage = (annualCosts * 100) / annualNetCompensation;

    return annualCostsPercentage;
  }

  _getAnnualCostsThreshold(
    thresholds: AnnualCostsThreshold[],
    annualCostsPercentage: number,
  ): AnnualCostsThreshold {
    return thresholds.find(
      (threshold) =>
        annualCostsPercentage <= +threshold.max &&
        annualCostsPercentage > +threshold.min,
    );
  }
}
