import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';

@Injectable()
@Dependencies(getRepositoryToken(Score))
export class FinancialWellnessService {
  scoreRepository: Repository<Score>;

  constructor(@InjectRepository(Score) scoreRepository : Repository<Score>) {
    this.scoreRepository = scoreRepository;
  }

   get(annualIncome: number, monthlyCosts: number){
     var newScore = this.scoreRepository.create({monthlyCosts, annualIncome});
     this.scoreRepository.save(newScore);
    return '';
  }

  findAll() {
    return this.scoreRepository.find();
  }

  findOne(id) {
    return this.scoreRepository.findOneBy({ id });
  }

  async remove(id) {
    await this.scoreRepository.delete(id);
  }
}
