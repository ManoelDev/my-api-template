import { InMemoryUsersRepository } from '@/modules/users/repository/inMemory/InMemoryUsersRepository';
import { createUsersUseCase } from '@/modules/users/useCase/createUsersUseCase';
import { compare } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

let usersRepository: InMemoryUsersRepository;
let sut: createUsersUseCase;

describe('Create User (UNIT)', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new createUsersUseCase(usersRepository);
  });

  const BodyObject = {
    name: 'John Doe',
    email: 'jhondoe@example.com',
    password: '123456',
  };

  it('Should be able create a new users', async () => {
    const { user } = await sut.execute(BodyObject);
    expect(user.id).toEqual(expect.any(String));
  });

  it('Should be able verify as hash password', async () => {
    const { user } = await sut.execute(BodyObject);
    const compareHashPassword = await compare('123456', user.password);

    expect(compareHashPassword).toBe(true);
  });

  it('Should not be able to register with same email twice', async () => {
    const { user } = await sut.execute(BodyObject);

    expect(user.id).toEqual(expect.any(String));
    await expect(() => sut.execute(BodyObject)).rejects.toThrowError('Email already exists.');
  });
});
