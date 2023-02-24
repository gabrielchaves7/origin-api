import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ScoreService } from './score.service';
import { Score, ScoreStatus } from '../entity/score.entity';
import { repositoryMockFactory } from '../../test.helpers';
import { TaxService } from '../../tax/service/tax.service';
import { Tax, TaxEnum } from '../../tax/entity/tax.entity';
import { AnnualCostsThreshold } from '../entity/annual-costs-threshold.entity';
import { ScoreDataSource } from '../datasource/score.datasource';
import { TaxDataSource } from '../../tax/datasource/tax.datasource';
import { AnnualCostsThresholdDataSource } from '../datasource/annual-costs-threshold.datasource';

describe('ScoreService', () => {
  let scoreService: ScoreService;
  let taxService: TaxService;
  let getTaxSpy;
  let findAnnualCostsThresholdSpy;
  let annualCostsThresholdDataSource: AnnualCostsThresholdDataSource;
  let scoreDataSource: ScoreDataSource;

  beforeEach(async () => {
    const moduleRef = await createTestingModule();

    scoreService = moduleRef.get<ScoreService>(ScoreService);
    taxService = moduleRef.get<TaxService>(TaxService);
    annualCostsThresholdDataSource =
      moduleRef.get<AnnualCostsThresholdDataSource>(
        AnnualCostsThresholdDataSource,
      );
    scoreDataSource = moduleRef.get<ScoreDataSource>(ScoreDataSource);

    spyGetTax();
    spyFindAnnualCostsThreshold();
    spyScoreDataSource();
  });

  const createTestingModule = async (): Promise<TestingModule> => {
    return await Test.createTestingModule({
      providers: [
        ScoreService,
        TaxService,
        ScoreDataSource,
        TaxDataSource,
        AnnualCostsThresholdDataSource,
        { provide: getRepositoryToken(Score), useValue: repositoryMockFactory },
        {
          provide: getRepositoryToken(AnnualCostsThreshold),
          useValue: repositoryMockFactory,
        },
        { provide: getRepositoryToken(Tax), useFactory: repositoryMockFactory },
      ],
    }).compile();
  };

  const spyGetTax = () => {
    getTaxSpy = jest
      .spyOn(taxService, 'findOne')
      .mockImplementation(() =>
        Promise.resolve(new Tax({ name: TaxEnum.ANNUAL_TAX, value: 8 })),
      );
  };

  const spyFindAnnualCostsThreshold = () => {
    findAnnualCostsThresholdSpy = jest
      .spyOn(annualCostsThresholdDataSource, 'find')
      .mockImplementation(() =>
        Promise.resolve([
          new AnnualCostsThreshold({
            status: ScoreStatus.LOW,
            min: '75',
            max: 'Infinity',
          }),
          new AnnualCostsThreshold({
            status: ScoreStatus.MEDIUM,
            min: '25',
            max: '75',
          }),
          new AnnualCostsThreshold({
            status: ScoreStatus.HEALTHY,
            min: '0',
            max: '25',
          }),
        ]),
      );
  };

  const spyScoreDataSource = () => {
    jest
      .spyOn(scoreDataSource, 'save')
      .mockImplementationOnce(() => Promise.resolve());
  };

  describe('When ANNUAL_TAX is 8%', () => {
    it('should return HEALTHY if user annual costs represents less than or is equal to 25% of his annual net compensation', async () => {
      var result = await scoreService.get(1000, 10);
      expect(result.status).toBe('HEALTHY');
    });

    it('should return MEDIUM if user annual costs is greater than 25% and less than or equal 75% of his annual net compensation,', async () => {
      var result = await scoreService.get(1000, 30);
      expect(result.status).toBe('MEDIUM');
    });

    it('should return LOW if user annual costs is greater than 75% of his annual net compensation', async () => {
      var result = await scoreService.get(1000, 80);
      expect(result.status).toBe('LOW');
    });

    it('should call taxRepository.getTax', async () => {
      await scoreService.get(1000, 10);
      expect(getTaxSpy).toHaveBeenCalledTimes(1);
      expect(getTaxSpy).toHaveBeenCalledWith(TaxEnum.ANNUAL_TAX);
    });

    it('should call scoreRepository to save the calculated score', async () => {
      var expectedScore = new Score({
        annualIncome: 1000,
        monthlyCosts: 10,
        status: ScoreStatus.HEALTHY,
      });
      var saveSpy = jest.spyOn(scoreDataSource, 'save');

      await scoreService.get(1000, 10);
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(expectedScore);
    });

    it('should call annualCostsThreshold.find to find the thresholds', async () => {
      await scoreService.get(1000, 10);
      expect(findAnnualCostsThresholdSpy).toHaveBeenCalledTimes(1);
      expect(findAnnualCostsThresholdSpy).toHaveBeenCalledWith();
    });
  });
});
