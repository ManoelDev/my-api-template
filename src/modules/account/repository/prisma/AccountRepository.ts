import { prisma } from '@/libs/prisma';
import { IAccountRepository } from '../IAccountRepository';
import { Account, Prisma } from '@prisma/client';

export class AccountRepository implements IAccountRepository {
	async findByEmail(email: Account['email']) {
		const query = prisma.account.findUnique({ where: { email } });
		return query;
	}
	async create(data: Prisma.AccountCreateInput) {
		const query = prisma.account.create({ data });
		return query;
	}
}
