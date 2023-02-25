import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../test.helpers';
import { TaxDto } from '../dto/tax.dto';
import { Tax, TaxEnum } from '../entity/tax.entity';
import { TaxService } from '../service/tax.service';
import { TaxController } from './tax.controller';
import { TaxDataSource } from '../datasource/tax.datasource';

describe('TaxController', () => {
  let taxController: TaxController;
  let taxService: TaxService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TaxController],
      providers: [
        TaxService,
        TaxDataSource,
        { provide: getRepositoryToken(Tax), useFactory: repositoryMockFactory },
      ],
    }).compile();

    taxService = moduleRef.get<TaxService>(TaxService);
    taxController = moduleRef.get<TaxController>(TaxController);
  });

  describe('Updating tax', () => {
    it('should call taxService.put', async () => {
      const spy = jest
        .spyOn(taxService, 'put')
        .mockImplementation(() =>
          Promise.resolve(new TaxDto({ name: TaxEnum.ANNUAL_TAX, value: 10 })),
        );
      const result = await taxController.put(
        new TaxDto({ name: TaxEnum.ANNUAL_TAX, value: 10 }),
      );
      expect(result.name).toBe('ANNUAL_TAX');
      expect(result.value).toBe(10);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
