import { IUsersRepository } from '../IUsersRepository';
import { Users, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements IUsersRepository {
  public users: Users[] = [];

  async findByEmail(email: string): Promise<Users | null> {
    const account = this.users.find(account => account.email === email);
    if (!account) return null;
    return account;
  }

  async create(data: Prisma.UsersCreateInput): Promise<Users> {
    const account = { ...data, id: randomUUID(), createdAt: new Date(), updatedAt: new Date() };
    this.users.push(account);
    return account;
  }
}