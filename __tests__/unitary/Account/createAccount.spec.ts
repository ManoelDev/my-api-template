import { AccountRepositoryInMemory } from '@/modules/account/repository/inMemory/AccountRepositoryInMemory';
import { CreateAccountUseCase } from '@/modules/account/useCase/CreateAccountUseCase';
import { compare } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

let accountRepository: AccountRepositoryInMemory;
let sut: CreateAccountUseCase;

describe('Create Account (UNIT)', () => {
  beforeEach(() => {
    accountRepository = new AccountRepositoryInMemory();
    sut = new CreateAccountUseCase(accountRepository);
  });

  const BodyObject = {
    name: 'John Doe',
    email: 'jhondoe@example.com',
    password: '123456',
  };

  it('Should be able create a new users', async () => {
    const {
      account: { id },
    } = await sut.execute(BodyObject);
    expect(id).toEqual(expect.any(String));
  });

  it('Should be able verify as hash password', async () => {
    const {
      account: { password },
    } = await sut.execute(BodyObject);
    const compareHashPassword = await compare('123456', password);

    expect(compareHashPassword).toBe(true);
  });

  it('Should not be able to register with same email twice', async () => {
    const {
      account: { id },
    } = await sut.execute(BodyObject);

    expect(id).toEqual(expect.any(String));
    await expect(() => sut.execute(BodyObject)).rejects.toThrowError('Email já cadastrado.');
  });
});
