import { Test, TestingModule } from '@nestjs/testing';
import { FinancialWellnessController } from './financial-wellness.controller';

describe('FinancialWellnessController', () => {
  let controller: FinancialWellnessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialWellnessController],
    }).compile();

    controller = module.get<FinancialWellnessController>(FinancialWellnessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
