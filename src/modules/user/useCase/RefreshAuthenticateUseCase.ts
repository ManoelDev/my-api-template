import { compare } from 'bcryptjs';
import { IUsersRepository } from '../repository/IUsersRepository';
import { Users } from '@prisma/client';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  account: Users;
}

export class RefreshAuthenticateUseCase {
  constructor(private accountRepository: IUsersRepository) {}

  async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const account = await this.accountRepository.findByEmail(email);
    if (!account) throw new Error('invalid credentials');

    const isValidPassword = await compare(password, account.password);
    if (!isValidPassword) throw new Error('invalid credentials');

    return { account };
  }
}
