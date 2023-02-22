import { Body, Controller, Put } from '@nestjs/common';
import { TaxDto } from '../dto/tax.dto';
import { TaxService } from '../service/tax.service';

@Controller('tax/api')
export class TaxController {
  constructor(private taxService: TaxService) {}

  @Put()
  async updateTax(@Body() taxDto: TaxDto): Promise<TaxDto> {
    try {
      var updatedTax = await this.taxService.updateTax(
        taxDto.name,
        taxDto.value,
      );

      return new TaxDto(updatedTax.name, updatedTax.value);
    } catch (error) {}
  }
}
