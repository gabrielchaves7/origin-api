import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tax, TaxEnum } from '../entity/tax.entity';

@Injectable()
@Dependencies(getRepositoryToken(Tax))
export class TaxDataSource {
  taxRepository: Repository<Tax>;

  constructor(@InjectRepository(Tax) taxRepository: Repository<Tax>) {
    this.taxRepository = taxRepository;
  }

  async put(name: string, value: number): Promise<Tax> {
    var updatedTax = this.taxRepository.create({
      name: name as TaxEnum,
      value,
    });
    return await this.taxRepository.save(updatedTax);
  }

  async findOne(name: TaxEnum): Promise<Tax> {
    return await this.taxRepository.findOneBy({ name });
  }
}
