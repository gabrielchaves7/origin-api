import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/test.helpers';
import { Repository } from 'typeorm';

import { Tax } from '../entity/tax.entity';
import { TaxService } from './tax.service';


describe('FinancialWellnessService', () => {
  let taxService: TaxService;
  let repository : Repository<Tax>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        providers: [TaxService, {provide: getRepositoryToken(Tax), useFactory: repositoryMockFactory}],
      }).compile();

      taxService = moduleRef.get<TaxService>(TaxService);
      repository = moduleRef.get(getRepositoryToken(Tax));
  });

  describe('score', () => {
    it('should return HEATLY if user annual costs represents less than or is equal to 25% of his annual net compensation', async () => {
      var result = await taxService.updateTax('ANNUAL_INCOME', 10);
      expect(result.name).toBe('ANNUAL_INCOME');
      expect(result.value).toBe(10);
    });
  });
});