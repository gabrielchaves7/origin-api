import { Injectable, Dependencies, Inject } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tax, TaxEnum } from '../entity/tax.entity';
import { TaxDataSource } from '../datasource/tax.datasource';
import { TaxDto } from '../dto/tax.dto';

@Injectable()
@Dependencies(getRepositoryToken(Tax))
export class TaxService {
  constructor(
    @Inject(TaxDataSource) private readonly taxDataSource: TaxDataSource,
  ) {}

  async put(taxDto: TaxDto): Promise<Tax> {
    return this.taxDataSource.put(taxDto);
  }

  async findOne(name: TaxEnum): Promise<Tax> {
    return this.taxDataSource.findOne(name);
  }
}
