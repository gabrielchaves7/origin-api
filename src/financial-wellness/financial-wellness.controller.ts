import { Controller, Get, Param, Query } from '@nestjs/common';
import { FinancialWellnessService } from './financial-wellness.service';

@Controller('financial-wellness/api')
export class FinancialWellnessController {
  constructor(private financialWellnessService: FinancialWellnessService) {}

    @Get('score')
    score(@Query('annualIncome') annualIncome: string, @Query('monthlyCosts') monthlyCosts: string): string {
      var _annualIncome,_monthlyCosts:number;
      _annualIncome = parseFloat(annualIncome);
      _monthlyCosts = parseFloat(monthlyCosts);
      return this.financialWellnessService.get(_annualIncome, _monthlyCosts);
    }
}
