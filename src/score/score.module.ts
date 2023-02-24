import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxModule } from '../tax/tax.module';
import { ScoreController } from './controller/score.controller';
import { Score } from './entity/score.entity';
import { ScoreService } from './service/score.service';
import { AnnualCostsThreshold } from './entity/annual-costs-threshold.entity';
import { ScoreDataSource } from './datasource/score.datasource';
import { AnnualCostsThresholdDataSource } from './datasource/annual-costs-threshold.datasource';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score]),
    TypeOrmModule.forFeature([AnnualCostsThreshold]),
    TaxModule,
  ],
  providers: [ScoreService, ScoreDataSource, AnnualCostsThresholdDataSource],
  controllers: [ScoreController],
  exports: [TypeOrmModule],
})
export class ScoreModule {}
