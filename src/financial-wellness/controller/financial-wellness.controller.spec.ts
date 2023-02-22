import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinancialWellnessController } from './financial-wellness.controller';
import { FinancialWellnessService } from '../service/financial-wellness.service';
import { Score } from '../entity/score.entity';
import { repositoryMockFactory } from 'src/test.helpers';


describe('FinancialWellnessController', () => {
  let financialWellnessController: FinancialWellnessController;
  let financialWellnessService: FinancialWellnessService;
  let repository: Repository<Score>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FinancialWellnessController],
      providers: [FinancialWellnessService, { provide: getRepositoryToken(Score), useFactory: repositoryMockFactory }],
    }).compile();

    financialWellnessService = moduleRef.get<FinancialWellnessService>(FinancialWellnessService);
    financialWellnessController = moduleRef.get<FinancialWellnessController>(FinancialWellnessController);
    repository = moduleRef.get(getRepositoryToken(Score));
  });

  describe('score', () => {
    it('should return HEATLY if user annual costs represents less than or is equal to 25% of his annual net compensation', async () => {
      var result = financialWellnessController.score(1000, 10);
      expect(result.score.status).toBe('HEALTHY');
    });

    it('should return MEDIUM if user annual costs is greater than 25% and less than or equal 75% of his annual net compensation,', async () => {
      var result = financialWellnessController.score(1000, 30);
      expect(result.score.status).toBe('MEDIUM');
    });

    it('should return LOW if user annual costs is greater than 75% of his annual net compensation', async () => {
      var result = financialWellnessController.score(1000, 80);
      expect(result.score.status).toBe('LOW');
    });
  });
});