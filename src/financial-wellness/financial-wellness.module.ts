import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxModule } from '../tax/tax.module';
import { FinancialWellnessController } from './controller/financial-wellness.controller';
import { Score } from './entity/score.entity';
import { FinancialWellnessService } from './service/financial-wellness.service';
import { AnnualCostsThreshold } from './entity/annual-costs-threshold.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score]),
    TypeOrmModule.forFeature([AnnualCostsThreshold]),
    TaxModule,
  ],
  providers: [FinancialWellnessService],
  controllers: [FinancialWellnessController],
  exports: [TypeOrmModule],
})
export class FinancialWellnessModule {}
