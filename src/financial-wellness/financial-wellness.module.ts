import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxModule } from '../tax/tax.module';
import { FinancialWellnessController } from './controller/financial-wellness.controller';
import { Score } from './entity/score.entity';
import { FinancialWellnessService } from './service/financial-wellness.service';

@Module({
  imports: [TypeOrmModule.forFeature([Score]), TaxModule],
  providers: [FinancialWellnessService],
  controllers: [FinancialWellnessController],
  exports: [TypeOrmModule],
})
export class FinancialWellnessModule {}
