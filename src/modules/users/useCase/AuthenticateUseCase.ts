import { compare } from 'bcryptjs';
import { IUsersRepository } from '../repository/IUsersRepository';
import { Users } from '@prisma/client';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  users: Users;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const users = await this.usersRepository.findByEmail(email);
    if (!users) throw new Error('invalid credentials');

    const isValidPassword = await compare(password, users.password);
    if (!isValidPassword) throw new Error('invalid credentials');

    return { users };
  }
}
