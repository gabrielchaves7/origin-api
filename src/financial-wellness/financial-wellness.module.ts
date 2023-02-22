import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entity/score.entity';
import { FinancialWellnessController } from './controller/financial-wellness.controller';
import { FinancialWellnessService } from './service/financial-wellness.service';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  providers: [FinancialWellnessService],
  controllers: [FinancialWellnessController],
  exports: [TypeOrmModule]
})
export class FinancialWellnessModule {}