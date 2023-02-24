import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from '../entity/score.entity';
import { AnnualCostsThreshold } from '../entity/annual-costs-threshold.entity';

@Injectable()
@Dependencies(getRepositoryToken(Score))
export class AnnualCostsThresholdDataSource {
  annualCostsThresholdRepository: Repository<AnnualCostsThreshold>;

  constructor(
    @InjectRepository(AnnualCostsThreshold)
    annualCostsThresholdRepository: Repository<AnnualCostsThreshold>,
  ) {
    this.annualCostsThresholdRepository = annualCostsThresholdRepository;
  }

  async find(): Promise<AnnualCostsThreshold[]> {
    return await this.annualCostsThresholdRepository.find();
  }
}
