import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { repositoryMockFactory } from '../../test.helpers';
import { TaxDto } from '../dto/tax.dto';
import { Tax, TaxEnum } from '../entity/tax.entity';
import { TaxService } from '../service/tax.service';
import { TaxController } from './tax.controller';
import { TaxDataSource } from '../datasource/tax.datasource';

describe('TaxController', () => {
  let taxController: TaxController;
  let taxService: TaxService;
  let repository: Repository<Tax>;

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
    repository = moduleRef.get(getRepositoryToken(Tax));
  });

  describe('Updating tax', () => {
    it('should call taxService.put', async () => {
      var spy = jest
        .spyOn(taxService, 'put')
        .mockImplementation(() =>
          Promise.resolve(new Tax({ name: TaxEnum.ANNUAL_TAX, value: 10 })),
        );
      var result = await taxController.put(new TaxDto('ANNUAL_TAX', 10));
      expect(result.name).toBe('ANNUAL_TAX');
      expect(result.value).toBe(10);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
