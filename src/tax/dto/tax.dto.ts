import { ApiProperty } from "@nestjs/swagger";
import { Tax, TaxEnum } from "../entity/tax.entity";

export class TaxDto implements Tax{
  constructor({name, value}) {
    this.name = name;
    this.value = value;
  }

  @ApiProperty({ enum: ['ANNUAL_TAX'], description: "The name of the Tax", default: TaxEnum.ANNUAL_TAX})
  name: TaxEnum;
  @ApiProperty({description: "The new value to the tax", default: 8})
  value: number;
}
