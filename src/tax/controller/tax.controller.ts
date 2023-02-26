import { Body, Controller, Put, UseFilters } from '@nestjs/common';
import { TaxDto } from '../dto/tax.dto';
import { TaxService } from '../service/tax.service';
import { HttpExceptionFilter } from '../../http-exception.filter';

@Controller('tax')
@UseFilters(new HttpExceptionFilter())
export class TaxController {
  constructor(private taxService: TaxService) {}

  @Put()
  async put(@Body() taxDto: TaxDto): Promise<TaxDto> {
    return this.taxService.put(taxDto);
  }
}
