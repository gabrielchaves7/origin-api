import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Score', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET score should return 200 when annualIncome and monthlyCosts are valid`, () => {
    return request(app.getHttpServer())
      .get('/score?annualIncome=1000&monthlyCosts=10')
      .expect(200)
      .then((response) => {
        const score = response.body;
        expect(score.status).toEqual('HEALTHY');
        expect(score.monthlyCosts).toEqual(10);
        expect(score.annualIncome).toEqual(1000);
      });
  });

  it(`/GET score should return 400 when annualIncome is string`, () => {
    return request(app.getHttpServer())
      .get('/score?annualIncome="1000"&monthlyCosts=10')
      .expect(400);
  });

  it(`/GET score should return 400 when monthlyCosts is string`, () => {
    return request(app.getHttpServer())
      .get('/score?annualIncome=1000&monthlyCosts="10"')
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
