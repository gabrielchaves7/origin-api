import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Score', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it(`/POST score should return 200 when annualIncome and monthlyCosts are valid`, () => {
    return request(app.getHttpServer())
      .post('/score')
      .send({ annualIncome: 1000, monthlyCosts: 10 })
      .expect(201)
      .then((response) => {
        const score = response.body;
        expect(score.status).toEqual('HEALTHY');
        expect(score.monthlyCosts).toEqual(10);
        expect(score.annualIncome).toEqual(1000);
      });
  });

  it(`/POST score should return 400 when annualIncome is 0`, () => {
    return request(app.getHttpServer())
      .post('/score')
      .send({ annualIncome: 0, monthlyCosts: 10 })
      .expect(400)
      .then((response) => {
        const error = response.body;
        expect(error).toEqual({
          error: 'Bad Request',
          message: ['annualIncome should not be equal to 0'],
          statusCode: 400,
        });
      });
  });

  it(`/POST score should return 400 when monthlyCosts is 0`, () => {
    return request(app.getHttpServer())
      .post('/score')
      .send({ annualIncome: 10, monthlyCosts: 0 })
      .expect(400)
      .then((response) => {
        const error = response.body;
        expect(error).toEqual({
          error: 'Bad Request',
          message: ['monthlyCosts should not be equal to 0'],
          statusCode: 400,
        });
      });
  });

  it(`/POST score should return 400 when annualIncome is bigger than 1000000000`, () => {
    return request(app.getHttpServer())
      .post('/score')
      .send({ annualIncome: 2000000000, monthlyCosts: 10 })
      .expect(400)
      .then((response) => {
        const error = response.body;
        expect(error).toEqual({
          error: 'Bad Request',
          message: ['annualIncome must not be greater than 1000000000'],
          statusCode: 400,
        });
      });
  });

  it(`/POST score should return 400 when monthlyCosts is 1000000000`, () => {
    return request(app.getHttpServer())
      .post('/score')
      .send({ annualIncome: 10, monthlyCosts: 2000000000 })
      .expect(400)
      .then((response) => {
        const error = response.body;
        expect(error).toEqual({
          error: 'Bad Request',
          message: ['monthlyCosts must not be greater than 1000000000'],
          statusCode: 400,
        });
      });
  });

  it(`/POST score should return 400 when annualIncome is String`, () => {
    return request(app.getHttpServer())
      .post('/score')
      .send({ annualIncome: '10', monthlyCosts: 10 })
      .expect(400)
      .then((response) => {
        const error = response.body;
        expect(error).toEqual({
          error: 'Bad Request',
          message: [
            'annualIncome must not be greater than 1000000000',
            'annualIncome must not be less than 0',
            'annualIncome must be a number conforming to the specified constraints',
          ],
          statusCode: 400,
        });
      });
  });

  it(`/POST score should return 400 when monthlyCosts is String`, () => {
    return request(app.getHttpServer())
      .post('/score')
      .send({ annualIncome: 10, monthlyCosts: '10' })
      .expect(400)
      .then((response) => {
        const error = response.body;
        expect(error).toEqual({
          error: 'Bad Request',
          message: [
            "monthlyCosts must not be greater than 1000000000",
            "monthlyCosts must not be less than 0",
            "monthlyCosts must be a number conforming to the specified constraints"
          ],
          statusCode: 400,
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
