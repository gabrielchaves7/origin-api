import { Injectable, Dependencies, Inject } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tax, TaxEnum } from '../../tax/entity/tax.entity';
import { TaxService } from '../../tax/service/tax.service';
import { Score } from '../entity/score.entity';
import { AnnualCostsThreshold } from '../entity/annual-costs-threshold.entity';
import { ScoreDataSource } from '../datasource/score.datasource';
import { AnnualCostsThresholdDataSource } from '../datasource/annual-costs-threshold.datasource';

@Injectable()
@Dependencies(getRepositoryToken(Score))
export class ScoreService {
  constructor(
    @Inject(AnnualCostsThresholdDataSource)
    private readonly annualCostsThresholdDataSource: AnnualCostsThresholdDataSource,
    @Inject(TaxService) private readonly taxService: TaxService,
    @Inject(ScoreDataSource) private readonly scoreDataSource: ScoreDataSource,
  ) {}

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

    return this.scoreDataSource.save({
      annualIncome,
      monthlyCosts,
      status: annualCostsThreshold.status,
    });
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
