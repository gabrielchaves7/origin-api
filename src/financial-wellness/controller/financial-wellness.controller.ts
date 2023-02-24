import { Controller, Get, ParseFloatPipe, Query } from '@nestjs/common';
import { FinancialWellnessService } from '../service/financial-wellness.service';
import { Score } from '../entity/score.entity';

@Controller('financial-wellness')
export class FinancialWellnessController {
  constructor(private financialWellnessService: FinancialWellnessService) {}

  @Get('score')
  async score(
    @Query('annualIncome', ParseFloatPipe) annualIncome: number,
    @Query('monthlyCosts', ParseFloatPipe) monthlyCosts: number,
  ): Promise<Score> {
    try {
      return await this.financialWellnessService.score(
        annualIncome,
        monthlyCosts,
      );
    } catch (error) {
      var a = error;
    }
  }
}
