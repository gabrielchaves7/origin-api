import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxModule } from '../tax/tax.module';
import { ScoreController } from './controller/score.controller';
import { Score } from './entity/score.entity';
import { ScoreService } from './service/score.service';
import { AnnualCostsThreshold } from './entity/annual-costs-threshold.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score]),
    TypeOrmModule.forFeature([AnnualCostsThreshold]),
    TaxModule,
  ],
  providers: [ScoreService],
  controllers: [ScoreController],
  exports: [TypeOrmModule],
})
export class ScoreModule {}
