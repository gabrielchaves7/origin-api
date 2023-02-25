import {
  Controller,
  Get,
  ParseFloatPipe,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ScoreService } from '../service/score.service';
import { Score } from '../entity/score.entity';
import { HttpExceptionFilter } from '../../http-exception.filter';

@Controller('score')
export class ScoreController {
  constructor(private scoreService: ScoreService) {}

  @Get('')
  @UseFilters(new HttpExceptionFilter())
  async get(
    @Query('annualIncome', ParseFloatPipe) annualIncome: number,
    @Query('monthlyCosts', ParseFloatPipe) monthlyCosts: number,
  ): Promise<Score> {
    return await this.scoreService.get(annualIncome, monthlyCosts);
  }
}
