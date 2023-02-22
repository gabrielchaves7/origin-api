import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './score.entity';
import { FinancialWellnessService } from './financial-wellness.service';
import { FinancialWellnessController } from './financial-wellness.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Score])],
  providers: [FinancialWellnessService],
  controllers: [FinancialWellnessController],
  exports: [TypeOrmModule]
})
export class FinancialWellnessModule {}