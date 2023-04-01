import { Users } from '@prisma/client';
import { hash } from 'bcryptjs';
import { IUsersRepository } from '../repository/IUsersRepository';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: Users;
}

export class createUsersUseCase {
  constructor(private accountRepository: IUsersRepository) {}

  async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const passwordHash = await hash(password, 6);

    const findAccount = await this.accountRepository.findByEmail(email);
    if (findAccount) throw new Error('Email already exists.');

    const user = await this.accountRepository.create({ email, password: passwordHash });

    return { user };
  }
}
