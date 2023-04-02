import { Prisma, Users } from '@prisma/client';

export type IUsersRepository = {
  findByEmail(email: string): Promise<Users | null>;
  create(data: Prisma.UsersCreateInput): Promise<Users>;
};
