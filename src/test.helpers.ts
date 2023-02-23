import { Repository } from 'typeorm';

// @ts-ignore
export const repositoryMockFactory: () => Repository<any> = jest.fn(() => ({
  save: jest.fn((entity) => entity),
  find: jest.fn((entity) => entity),
  create: jest.fn((entity) => entity),
  findOneBy: jest.fn(),
}));
