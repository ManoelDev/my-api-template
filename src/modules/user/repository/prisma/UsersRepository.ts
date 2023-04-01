import { prisma } from '@/libs/prisma';
import { IUsersRepository } from '../IUsersRepository';
import { Users, Prisma } from '@prisma/client';

export class UsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<Users | null> {
    return await prisma.users.findUnique({ where: { email } });
  }
  async create(data: Prisma.UsersCreateInput): Promise<Users> {
    const account = await prisma.users.create({ data });
    return account;
  }
}
