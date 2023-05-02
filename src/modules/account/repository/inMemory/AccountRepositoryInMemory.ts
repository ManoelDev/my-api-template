import { Account, Prisma } from '@prisma/client';
import { IAccountRepository } from '../IAccountRepository';
import { randomUUID } from 'crypto';

export class AccountRepositoryInMemory implements IAccountRepository {
  public account: Account[] = [];

  create(data: Prisma.AccountCreateInput): Promise<Partial<Account>> {
    const account = {
      id: randomUUID(),
      email: data.email,
      password: data.password,
      role: 'USER',
      status: 'ACTIVE',
      profileId: null,
      addressId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.account.push(account);

    return Promise.resolve(account);
  }

  findByEmail(email: Account['email']): Promise<Account | null> {
    const query = this.account.find(account => account.email === email);
    return Promise.resolve(query || null);
  }
}
