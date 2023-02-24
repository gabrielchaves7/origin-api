import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score, ScoreStatus } from '../entity/score.entity';

@Injectable()
@Dependencies(getRepositoryToken(Score))
export class ScoreDataSource {
  scoreRepository: Repository<Score>;

  constructor(@InjectRepository(Score) scoreRepository: Repository<Score>) {
    this.scoreRepository = scoreRepository;
  }

  async save(score: Score): Promise<void> {
    await this.scoreRepository.save(score);
  }
}
