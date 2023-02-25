import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaxService } from '../../tax/service/tax.service';
import { Tax } from '../../tax/entity/tax.entity';
import { repositoryMockFactory } from '../../test.helpers';
import { Score, ScoreStatus } from '../entity/score.entity';
import { ScoreService } from '../service/score.service';
import { ScoreController } from './score.controller';
import { AnnualCostsThreshold } from '../entity/annual-costs-threshold.entity';
import { AnnualCostsThresholdDataSource } from '../datasource/annual-costs-threshold.datasource';
import { ScoreDataSource } from '../datasource/score.datasource';
import { TaxDataSource } from '../../tax/datasource/tax.datasource';
import { ScoreRequestDto } from '../dto/score.dto';

describe('ScoreController', () => {
  let scoreController: ScoreController;
  let scoreService: ScoreService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ScoreController],
      providers: [
        ScoreService,
        TaxService,
        AnnualCostsThresholdDataSource,
        ScoreDataSource,
        TaxDataSource,
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

    scoreService = moduleRef.get<ScoreService>(ScoreService);
    scoreController = moduleRef.get<ScoreController>(ScoreController);
  });

  const _createScore = ({ annualIncome, monthlyCosts, status }): Score => {
    const score = new Score();
    score.status = status;
    score.annualIncome = annualIncome;
    score.monthlyCosts = monthlyCosts;
    return score;
  };

  describe('score', () => {
    it('should call scoreService.score', async () => {
      const spy = jest.spyOn(scoreService, 'post').mockImplementation(() =>
        Promise.resolve(
          _createScore({
            annualIncome: 1000,
            monthlyCosts: 10,
            status: ScoreStatus.HEALTHY,
          }),
        ),
      );
      const result = await scoreController.post(new ScoreRequestDto({annualIncome: 1000, monthlyCosts: 10}));
      expect(result.status).toBe('HEALTHY');
      expect(result.annualIncome).toBe(1000);
      expect(result.monthlyCosts).toBe(10);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(1000, 10);
    });
  });
});
