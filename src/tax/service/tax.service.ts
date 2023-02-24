import { Injectable, Dependencies, Inject } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tax, TaxEnum } from '../entity/tax.entity';
import { TaxDataSource } from '../datasource/tax.datasource';

@Injectable()
@Dependencies(getRepositoryToken(Tax))
export class TaxService {
  taxDataSource: TaxDataSource;

  constructor(@Inject(TaxDataSource) taxDataSource: TaxDataSource) {
    this.taxDataSource = taxDataSource;
  }

  async put(name: string, value: number): Promise<Tax> {
    return await this.taxDataSource.put(name, value);
  }

  async findOne(name: TaxEnum): Promise<Tax> {
    return await this.taxDataSource.findOne(name);
  }
}
