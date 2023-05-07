import { Prisma, Account } from '@prisma/client';

export type IAccountRepository = {
  create(data: Prisma.AccountCreateInput): Promise<Account>;
  findByEmail(email: string): Promise<Account | null>;
};
