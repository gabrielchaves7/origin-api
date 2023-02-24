import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxController } from './controller/tax.controller';
import { Tax } from './entity/tax.entity';
import { TaxService } from './service/tax.service';
import { TaxDataSource } from './datasource/tax.datasource';

@Module({
  imports: [TypeOrmModule.forFeature([Tax])],
  providers: [TaxService, TaxDataSource],
  controllers: [TaxController],
  exports: [TypeOrmModule, TaxService],
})
export class TaxModule {}
