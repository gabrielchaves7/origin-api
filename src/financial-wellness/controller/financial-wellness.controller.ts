import { Controller, Get, Param, ParseFloatPipe, Query } from '@nestjs/common';
import { FinancialWellnessService } from '../service/financial-wellness.service';
import { ScoreResponseDto } from '../dto/score-response.dto';

@Controller('financial-wellness/api')
export class FinancialWellnessController {
  constructor(private financialWellnessService: FinancialWellnessService) {}

    @Get('score')
    score(@Query('annualIncome', ParseFloatPipe) annualIncome: number, @Query('monthlyCosts', ParseFloatPipe) monthlyCosts: number): ScoreResponseDto {
      const scoreResponseDto = new ScoreResponseDto();
      try {
        var score =  this.financialWellnessService.get(annualIncome, monthlyCosts);
        scoreResponseDto.score = score;

        return scoreResponseDto;
      }catch(error){

      }

    }
}
