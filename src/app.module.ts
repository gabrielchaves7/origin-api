import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScoreController } from './score/controller/score.controller';
import { ScoreModule } from './score/score.module';
import { Score } from './score/entity/score.entity';
import { ScoreService } from './score/service/score.service';
import { TaxController } from './tax/controller/tax.controller';
import { TaxService } from './tax/service/tax.service';
import { Tax } from './tax/entity/tax.entity';
import { TaxModule } from './tax/tax.module';
import { ConfigModule } from '@nestjs/config';
import { AnnualCostsThreshold } from './score/entity/annual-costs-threshold.entity';

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
      entities: [Score, Tax, AnnualCostsThreshold],
      migrations: [],
    }),
    ScoreModule,
    TaxModule,
  ],
  controllers: [AppController, ScoreController, TaxController],
  providers: [AppService, ScoreService, TaxService],
})
export class AppModule {}
