import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FinancialWellnessService } from '../service/financial-wellness.service';
import { Score, ScoreStatus } from '../entity/score.entity';
import { repositoryMockFactory } from '../../test.helpers';
import { TaxService } from '../../tax/service/tax.service';
import { Tax, TaxEnum } from '../../tax/entity/tax.entity';
import { Repository } from 'typeorm';

describe('FinancialWellnessService', () => {
  let financialWellnessService: FinancialWellnessService;
  let taxService: TaxService;
  let getTaxSpy;
  let mockedScoreRepository: Repository<Tax>;

  const mockGetTax = () => {
    var tax = new Tax();
    tax.name = TaxEnum.ANNUAL_TAX;
    tax.value = 8;
    getTaxSpy = jest
      .spyOn(taxService, 'getTax')
      .mockImplementation(() => Promise.resolve(tax));
  };
  beforeEach(async () => {
    mockedScoreRepository = repositoryMockFactory();
    const moduleRef = await Test.createTestingModule({
      providers: [
        FinancialWellnessService,
        TaxService,
        { provide: getRepositoryToken(Score), useValue: mockedScoreRepository },
        { provide: getRepositoryToken(Tax), useFactory: repositoryMockFactory },
      ],
    }).compile();

    financialWellnessService = moduleRef.get<FinancialWellnessService>(
      FinancialWellnessService,
    );
    taxService = moduleRef.get<TaxService>(TaxService);

    mockGetTax();
  });

  const createScore = (
    monthlyCosts: number,
    annualIncome: number,
    status: ScoreStatus,
  ): Score => {
    var score = new Score();
    score.annualIncome = annualIncome;
    score.monthlyCosts = monthlyCosts;
    score.status = status;
    return score;
  };

  describe('When ANNUAL_TAX is 8%', () => {
    it('should return HEALTHY if user annual costs represents less than or is equal to 25% of his annual net compensation', async () => {
      var result = await financialWellnessService.score(1000, 10);
      expect(result.status).toBe('HEALTHY');
    });

    it('should return MEDIUM if user annual costs is greater than 25% and less than or equal 75% of his annual net compensation,', async () => {
      var result = await financialWellnessService.score(1000, 30);
      expect(result.status).toBe('MEDIUM');
    });

    it('should return LOW if user annual costs is greater than 75% of his annual net compensation', async () => {
      var result = await financialWellnessService.score(1000, 80);
      expect(result.status).toBe('LOW');
    });

    it('should call taxRepository.getTax', async () => {
      await financialWellnessService.score(1000, 10);
      expect(getTaxSpy).toHaveBeenCalledTimes(1);
      expect(getTaxSpy).toHaveBeenCalledWith(TaxEnum.ANNUAL_TAX);
    });

    it('should call scoreRepository to save the calculated score', async () => {
      var expectedScore = createScore(10, 1000, ScoreStatus.HEALTHY);
      var createSpy = jest.spyOn(mockedScoreRepository, 'create');
      var saveSpy = jest.spyOn(mockedScoreRepository, 'save');

      await financialWellnessService.score(1000, 10);
      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith({
        monthlyCosts: 10,
        annualIncome: 1000,
        status: ScoreStatus.HEALTHY,
      });
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(expectedScore);
    });
  });
});
