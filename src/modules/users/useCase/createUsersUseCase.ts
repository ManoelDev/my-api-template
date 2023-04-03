import { Users } from '@prisma/client';
import { hash } from 'bcryptjs';
import { IUsersRepository } from '../repository/IUsersRepository';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

interface ResponseDTO {
  user: Users;
}

export class createUsersUseCase {
  constructor(private accountRepository: IUsersRepository) {}

  async execute(data: RequestDTO): Promise<ResponseDTO> {
    const passwordHash = await hash(data.password, 6);

    const findAccount = await this.accountRepository.findByEmail(data.email);
    if (findAccount) throw new Error('Email already exists.');

    const user = await this.accountRepository.create({
      email: data.email,
      password: passwordHash,
      profile: { create: { name: data.name } },
    });

    return { user };
  }
}
