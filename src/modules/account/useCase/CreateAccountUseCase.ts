import { Account } from '.prisma/client';
import { CreateAccountType } from '../controller/CreateAccountController';
import { IAccountRepository } from '../repository/IAccountRepository';
import { hash } from 'bcryptjs';

export class CreateAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {
    // inject.
  }

  async execute(data: CreateAccountType): Promise<{ account: Account }> {
    const passwordHash = await hash(data.password, 6);

    const findAccount = await this.accountRepository.findByEmail(data.email);
    if (findAccount) throw new Error('Email já cadastrado.');

    const account = await this.accountRepository.create({
      email: data.email,
      password: passwordHash,
    });

    if (!account) throw new Error('Não foi possível criar a conta.');

    return { account };
  }
}
