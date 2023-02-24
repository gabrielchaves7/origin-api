import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../test.helpers';
import { Repository } from 'typeorm';
import { TaxService } from './tax.service';
import { Tax, TaxEnum } from '../entity/tax.entity';
import { TaxDataSource } from '../datasource/tax.datasource';

describe('TaxService', () => {
  let taxService: TaxService;
  let mockedRepository: Repository<Tax>;
  let taxDataSource: TaxDataSource;

  beforeEach(async () => {
    mockedRepository = repositoryMockFactory();
    const moduleRef = await Test.createTestingModule({
      providers: [
        TaxService,
        TaxDataSource,
        { provide: getRepositoryToken(Tax), useValue: mockedRepository },
      ],
    }).compile();

    taxService = moduleRef.get<TaxService>(TaxService);
    taxDataSource = moduleRef.get<TaxDataSource>(TaxDataSource);
  });
  describe('update tax', () => {
    it('should call taxDataSource.put', async () => {
      var spy = jest
        .spyOn(taxDataSource, 'put')
        .mockImplementation(() =>
          Promise.resolve(new Tax({ name: TaxEnum.ANNUAL_TAX, value: 8 })),
        );

      await taxService.put('ANNUAL_TAX', 10);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(TaxEnum.ANNUAL_TAX, 10);
    });
  });

  describe('get tax', () => {
    it('should call taxRepository.findOneBy', async () => {
      var spy = jest
        .spyOn(taxDataSource, 'findOne')
        .mockImplementation(() =>
          Promise.resolve(new Tax({ name: TaxEnum.ANNUAL_TAX, value: 8 })),
        );
      await taxService.findOne(TaxEnum.ANNUAL_TAX);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith('ANNUAL_TAX');
    });
  });
});
