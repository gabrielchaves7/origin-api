import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tax, TaxEnum } from '../entity/tax.entity';
import { TaxDto } from '../dto/tax.dto';

@Injectable()
@Dependencies(getRepositoryToken(Tax))
export class TaxDataSource {
  constructor(
    @InjectRepository(Tax) private readonly taxRepository: Repository<Tax>,
  ) {}

  async put(taxDto: TaxDto): Promise<Tax> {
    return this.taxRepository.save(taxDto);
  }

  async findOne(name: TaxEnum): Promise<Tax> {
    return this.taxRepository.findOneBy({ name });
  }
}
