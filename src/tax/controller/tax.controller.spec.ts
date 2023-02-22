import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxController } from './tax.controller';
import { TaxService } from '../service/tax.service';
import { Tax, TaxEnum } from '../entity/tax.entity';
import { repositoryMockFactory } from 'src/test.helpers';
import { TaxDto } from '../dto/tax.dto';

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

  describe('Updating tax', () => {
    it('Should return TaxResponseDto with updated values', async () => {
      var result = await taxController.updateTax(new TaxDto("ANNUAL_TAX", 10));
      expect(result.name).toBe('ANNUAL_TAX');
      expect(result.value).toBe(10);
    });
  });
});