import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaxService } from './service/tax.service';
import { TaxController } from './controller/tax.controller';
import { Tax } from './entity/tax.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tax])],
  providers: [TaxService],
  controllers: [TaxController],
  exports: [TypeOrmModule]
})
export class TaxModule {}