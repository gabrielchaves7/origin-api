import { Injectable, Dependencies, Inject } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tax, TaxEnum } from '../entity/tax.entity';
import { TaxDataSource } from '../datasource/tax.datasource';
import { TaxDto } from '../dto/tax.dto';

@Injectable()
@Dependencies(getRepositoryToken(Tax))
export class TaxService {
  taxDataSource: TaxDataSource;

  constructor(@Inject(TaxDataSource) taxDataSource: TaxDataSource) {
    this.taxDataSource = taxDataSource;
  }

  async put(taxDto: TaxDto): Promise<Tax> {
    return this.taxDataSource.put(taxDto);
  }

  async findOne(name: TaxEnum): Promise<Tax> {
    return this.taxDataSource.findOne(name);
  }
}
