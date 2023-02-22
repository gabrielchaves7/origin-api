import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../test.helpers';
import { Repository } from 'typeorm';
import { TaxService } from './tax.service';
import { Tax, TaxEnum } from '../entity/tax.entity';

describe('TaxService', () => {
  let taxService: TaxService;
  let mockedRepository: Repository<Tax>;

  beforeEach(async () => {
    mockedRepository = repositoryMockFactory();
    const moduleRef = await Test.createTestingModule({
      providers: [
        TaxService,
        { provide: getRepositoryToken(Tax), useValue: mockedRepository },
      ],
    }).compile();

    taxService = moduleRef.get<TaxService>(TaxService);
  });

  const createTax = (name: TaxEnum, value: number): Tax => {
    var tax = new Tax();
    tax.name = name;
    tax.value = value;
    return tax;
  };

  describe('update tax', () => {
    it('should call taxRepository.create and taxRepository.save', async () => {
      var expectedTax = createTax(TaxEnum.ANNUAL_TAX, 10);
      var createSpy = jest.spyOn(mockedRepository, 'create');
      var saveSpy = jest.spyOn(mockedRepository, 'save');
      await taxService.updateTax('ANNUAL_TAX', 10);

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith({
        name: TaxEnum.ANNUAL_TAX,
        value: 10,
      });
      expect(saveSpy).toHaveBeenCalledTimes(1);
      expect(saveSpy).toHaveBeenCalledWith(expectedTax);
    });
  });

  describe('get tax', () => {
    it('should call taxRepository.findOneBy', async () => {
      var findOneBySpy = jest.spyOn(mockedRepository, 'findOneBy');
      await taxService.getTax(TaxEnum.ANNUAL_TAX);

      expect(findOneBySpy).toHaveBeenCalledTimes(1);
      expect(findOneBySpy).toHaveBeenCalledWith({name: TaxEnum.ANNUAL_TAX});
    });
  });
});
