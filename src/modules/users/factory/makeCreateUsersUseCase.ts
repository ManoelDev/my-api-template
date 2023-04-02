import { UsersRepository } from '../repository/prisma/UsersRepository';
import { createUsersUseCase } from '../useCase/createUsersUseCase';

export function makeCreateUserUseCase() {
  const userRepository = new UsersRepository();
  const registerUseCase = new createUsersUseCase(userRepository);

  return registerUseCase;
}
