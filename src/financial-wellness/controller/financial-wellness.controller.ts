import { Controller, Get, ParseFloatPipe, Query } from '@nestjs/common';
import { ScoreResponseDto } from '../dto/score-response.dto';
import { FinancialWellnessService } from '../service/financial-wellness.service';

@Controller('financial-wellness/api')
export class FinancialWellnessController {
  constructor(private financialWellnessService: FinancialWellnessService) {}

  @Get('score')
  async score(
    @Query('annualIncome', ParseFloatPipe) annualIncome: number,
    @Query('monthlyCosts', ParseFloatPipe) monthlyCosts: number,
  ): Promise<ScoreResponseDto> {
    const scoreResponseDto = new ScoreResponseDto();
    try {
      var score = await this.financialWellnessService.score(
        annualIncome,
        monthlyCosts,
      );
      scoreResponseDto.score = score;

      return scoreResponseDto;
    } catch (error) {
      var a = error;
    }
  }
}
