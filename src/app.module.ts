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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
