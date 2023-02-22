import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialWellnessController } from './financial-wellness/controller/financial-wellness.controller';
import { FinancialWellnessModule } from './financial-wellness/financial-wellness.module';
import { Score } from './financial-wellness/entity/score.entity';
import { FinancialWellnessService } from './financial-wellness/service/financial-wellness.service';
import { TaxController } from './tax/controller/tax.controller';
import { TaxService } from './tax/service/tax.service';
import { Tax } from './tax/entity/tax.entity';
import { TaxModule } from './tax/tax.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'origin',
      synchronize: true,
      entities: [Score, Tax],
      migrations: [],
    }),
    FinancialWellnessModule,
    TaxModule,
  ],
  controllers: [AppController, FinancialWellnessController, TaxController],
  providers: [AppService, FinancialWellnessService, TaxService],
})
export class AppModule {}
