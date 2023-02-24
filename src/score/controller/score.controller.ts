import { Controller, Get, ParseFloatPipe, Query } from '@nestjs/common';
import { ScoreService } from '../service/score.service';
import { Score } from '../entity/score.entity';

@Controller('score')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  @Get('')
  async get(
    @Query('annualIncome', ParseFloatPipe) annualIncome: number,
    @Query('monthlyCosts', ParseFloatPipe) monthlyCosts: number,
  ): Promise<Score> {
    try {
      return await this.scoreService.get(
        annualIncome,
        monthlyCosts,
      );
    } catch (error) {
      var a = error;
    }
  }
}
