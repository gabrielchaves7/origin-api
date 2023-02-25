import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class ScoreRequestDto {
  constructor({annualIncome, monthlyCosts}){
    this.annualIncome = annualIncome;
    this.monthlyCosts = monthlyCosts;
  }
  @ApiProperty({
    description: 'Annual income, should be a number bigger than 0',
  })
  @IsInt()
  @Min(1, { message: 'annualIncome must be higher than 0' })
  @Max(1000000000, { message: 'monthlyCosts must be lower than 1000000000' })
  annualIncome: number;

  @ApiProperty({
    description: 'Monthly costs, should be a number bigger than 0',
  })
  @IsInt()
  @Min(1, { message: 'monthlyCosts must be higher than 0' })
  @Max(1000000000, { message: 'monthlyCosts must be lower than 1000000000' })
  monthlyCosts: number;
}
