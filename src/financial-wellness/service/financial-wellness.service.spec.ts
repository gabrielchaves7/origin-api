import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinancialWellnessService } from '../service/financial-wellness.service';
import { Score } from '../entity/score.entity';
import { repositoryMockFactory } from 'src/test.helpers';

describe('FinancialWellnessService', () => {
  let financialWellnessService: FinancialWellnessService;
  let repository : Repository<Score>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [FinancialWellnessService, {provide: getRepositoryToken(Score), useFactory: repositoryMockFactory}],
      }).compile();

      financialWellnessService = moduleRef.get<FinancialWellnessService>(FinancialWellnessService);
      repository = moduleRef.get(getRepositoryToken(Score));
  });

  describe('score', () => {
    it('should return HEATLY if user annual costs represents less than or is equal to 25% of his annual net compensation', async () => {
      var result = financialWellnessService.get(1000, 10);
      expect(result.status).toBe('HEALTHY');
    });

    it('should return MEDIUM if user annual costs is greater than 25% and less than or equal 75% of his annual net compensation,', async () => {
      var result = financialWellnessService.get(1000, 30);
      expect(result.status).toBe('MEDIUM');
    });

    it('should return LOW if user annual costs is greater than 75% of his annual net compensation', async () => {
      var result = financialWellnessService.get(1000, 80);
      expect(result.status).toBe('LOW');
    });
  });
});