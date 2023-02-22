export class TaxDto {
  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }

  name: string;
  value: number;
}
