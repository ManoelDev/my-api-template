import { Account } from '@prisma/client';
import { compare } from 'bcryptjs';
import { IAccountRepository } from '../repository/IAccountRepository';
import { AuthAccountType } from '../controller/AuthController';

export class AuthUseCase {
	constructor(private usersRepository: IAccountRepository) {}

	async execute({ email, password }: AuthAccountType): Promise<{
		account: Account;
	}> {
		const account = await this.usersRepository.findByEmail(email);
		if (!account) throw new Error('invalid credentials');

		const isValidPassword = await compare(password, account.password);
		if (!isValidPassword) throw new Error('invalid credentials');

		return { account };
	}
}
