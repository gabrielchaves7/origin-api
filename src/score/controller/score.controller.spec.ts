import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaxService } from '../../tax/service/tax.service';
import { Tax } from '../../tax/entity/tax.entity';
import { repositoryMockFactory } from '../../test.helpers';
import { Score, ScoreStatus } from '../entity/score.entity';
import { ScoreService } from '../service/score.service';
import { ScoreController } from './score.controller';
import { AnnualCostsThreshold } from '../entity/annual-costs-threshold.entity';

describe('ScoreController', () => {
  let scoreController: ScoreController;
  let scoreService: ScoreService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ScoreController],
      providers: [
        ScoreService,
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

    scoreService = moduleRef.get<ScoreService>(
      ScoreService,
    );
    scoreController = moduleRef.get<ScoreController>(
      ScoreController,
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
    it('should call scoreService.score', async () => {
      var spy = jest
        .spyOn(scoreService, 'get')
        .mockImplementation(() => Promise.resolve(mockedScore()));
      var result = await scoreController.get(1000, 10);
      expect(result.status).toBe('HEALTHY');
      expect(result.annualIncome).toBe(1000);
      expect(result.monthlyCosts).toBe(10);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(1000, 10);
    });
  });
});
