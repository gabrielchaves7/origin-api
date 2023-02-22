import { Test, TestingModule } from '@nestjs/testing';
import { FinancialWellnessService } from './financial-wellness.service';

describe('FinancialWellnessService', () => {
  let service: FinancialWellnessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinancialWellnessService],
    }).compile();

    service = module.get<FinancialWellnessService>(FinancialWellnessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
