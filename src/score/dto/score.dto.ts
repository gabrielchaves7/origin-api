import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min, NotEquals } from 'class-validator';

export class ScoreRequestDto {
  @ApiProperty({
    description: 'Annual income, should be a number bigger than 0',
  })
  @IsNumber()
  @Min(0)
  @NotEquals(0)
  @Max(1000000000)
  annualIncome: number;

  @ApiProperty({
    description: 'Monthly costs, should be a number bigger than 0',
  })
  @IsNumber()
  @NotEquals(0)
  @Min(0)
  @Max(1000000000)
  monthlyCosts: number;
}
