import { UsersRepository } from '../repository/prisma/UsersRepository';
import { AuthenticateUseCase } from '../useCase/AuthenticateUseCase';

export function makeAuthenticateUseCase() {
  const userRepository = new UsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  return authenticateUseCase;
}
