import { ApiProperty } from '@nestjs/swagger';
import { Tax, TaxEnum } from '../entity/tax.entity';
import { IsEnum, IsNumber } from 'class-validator';

export class TaxDto implements Tax {
  @IsEnum(TaxEnum)
  @ApiProperty({
    enum: ['ANNUAL_TAX'],
    description: 'The name of the Tax',
    default: TaxEnum.ANNUAL_TAX,
  })
  name: TaxEnum;

  @IsNumber()
  @ApiProperty({ description: 'The new value to the tax', default: 8 })
  value: number;
}
