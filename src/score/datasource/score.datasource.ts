import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from '../entity/score.entity';

@Injectable()
@Dependencies(getRepositoryToken(Score))
export class ScoreDataSource {
  scoreRepository: Repository<Score>;

  constructor(@InjectRepository(Score) scoreRepository: Repository<Score>) {
    this.scoreRepository = scoreRepository;
  }

  async save({ annualIncome, monthlyCosts, status }): Promise<Score> {
    const newScore = this.scoreRepository.create({
      annualIncome,
      monthlyCosts,
      status,
    });
    return await this.scoreRepository.save(newScore);
  }
}
