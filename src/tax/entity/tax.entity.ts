import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum TaxEnum {
  ANNUAL_TAX = 'ANNUAL_TAX',
}

@Entity()
export class Tax {
  @Column()
  value: number;

  @PrimaryColumn({
    type: 'enum',
    enum: TaxEnum,
    default: TaxEnum.ANNUAL_TAX,
  })
  name: TaxEnum;

  constructor({value, name}) {
    this.value = value;
    this.name = name;
  }
}
