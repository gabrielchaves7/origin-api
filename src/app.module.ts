import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialWellnessController } from './financial-wellness/financial-wellness.controller';
import { FinancialWellnessModule } from './financial-wellness/financial-wellness.module';
import { FinancialWellnessService } from './financial-wellness/financial-wellness.service';
import { Score } from './financial-wellness/score.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123456",
      database: "origin",
      synchronize: true,
      entities: [Score],
      migrations: [],
    }),
    FinancialWellnessModule
  ],
  controllers: [AppController, FinancialWellnessController],
  providers: [AppService, FinancialWellnessService],
})
export class AppModule {}

