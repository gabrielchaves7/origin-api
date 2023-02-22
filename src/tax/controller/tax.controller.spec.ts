import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { repositoryMockFactory } from '../../test.helpers';
import { TaxDto } from '../dto/tax.dto';
import { Tax, TaxEnum } from '../entity/tax.entity';
import { TaxService } from '../service/tax.service';
import { TaxController } from './tax.controller';

describe('TaxController', () => {
  let taxController: TaxController;
  let taxService: TaxService;
  let repository: Repository<Tax>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TaxController],
      providers: [TaxService, { provide: getRepositoryToken(Tax), useFactory: repositoryMockFactory }],
    }).compile();

    taxService = moduleRef.get<TaxService>(TaxService);
    taxController = moduleRef.get<TaxController>(TaxController);
    repository = moduleRef.get(getRepositoryToken(Tax));
  });

  const mockedTax = () => {
    var tax = new Tax();
    tax.name = TaxEnum.ANNUAL_TAX;
    tax.value = 10;
    return tax;
  }
  describe('Updating tax', () => {
    it('should call taxService.updateTax', async () => {
      var spy = jest.spyOn(taxService, 'updateTax').mockImplementation(() => Promise.resolve(mockedTax()));
      var result = await taxController.updateTax(new TaxDto("ANNUAL_TAX", 10));
      expect(result.name).toBe('ANNUAL_TAX');
      expect(result.value).toBe(10);
      expect(spy).toHaveBeenCalledTimes(1);   
    });
  });
});