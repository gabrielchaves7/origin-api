import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaxService } from '../../tax/service/tax.service';
import { Tax } from '../../tax/entity/tax.entity';
import { repositoryMockFactory } from '../../test.helpers';
import { Score, ScoreStatus } from '../entity/score.entity';
import { FinancialWellnessService } from '../service/financial-wellness.service';
import { FinancialWellnessController } from './financial-wellness.controller';
import { AnnualCostsThreshold } from '../entity/annual-costs-threshold.entity';

describe('FinancialWellnessController', () => {
  let financialWellnessController: FinancialWellnessController;
  let financialWellnessService: FinancialWellnessService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FinancialWellnessController],
      providers: [
        FinancialWellnessService,
        TaxService,
        {
          provide: getRepositoryToken(Score),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(AnnualCostsThreshold),
          useFactory: repositoryMockFactory,
        },
        { provide: getRepositoryToken(Tax), useFactory: repositoryMockFactory },
      ],
    }).compile();

    financialWellnessService = moduleRef.get<FinancialWellnessService>(
      FinancialWellnessService,
    );
    financialWellnessController = moduleRef.get<FinancialWellnessController>(
      FinancialWellnessController,
    );
  });

  const mockedScore = () => {
    var score = new Score();
    score.id = 1;
    score.annualIncome = 1000;
    score.monthlyCosts = 10;
    score.status = ScoreStatus.HEALTHY;
    return score;
  };

  describe('score', () => {
    it('should call financialWellnessService.score', async () => {
      var spy = jest
        .spyOn(financialWellnessService, 'score')
        .mockImplementation(() => Promise.resolve(mockedScore()));
      var result = await financialWellnessController.score(1000, 10);
      expect(result.score.status).toBe('HEALTHY');
      expect(result.score.annualIncome).toBe(1000);
      expect(result.score.monthlyCosts).toBe(10);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(1000, 10);
    });
  });
});
