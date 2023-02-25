import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tax, TaxEnum } from '../entity/tax.entity';
import { TaxDto } from '../dto/tax.dto';

@Injectable()
@Dependencies(getRepositoryToken(Tax))
export class TaxDataSource {
  taxRepository: Repository<Tax>;

  constructor(@InjectRepository(Tax) taxRepository: Repository<Tax>) {
    this.taxRepository = taxRepository;
  }

  async put(taxDto: TaxDto): Promise<Tax> {
    return await this.taxRepository.save(taxDto);
  }

  async findOne(name: TaxEnum): Promise<Tax> {
    return await this.taxRepository.findOneBy({ name });
  }
}
