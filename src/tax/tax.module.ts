import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxController } from './controller/tax.controller';
import { Tax } from './entity/tax.entity';
import { TaxService } from './service/tax.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tax])],
  providers: [TaxService],
  controllers: [TaxController],
  exports: [TypeOrmModule, TaxService],
})
export class TaxModule {}
