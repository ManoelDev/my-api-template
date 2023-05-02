import { AccountRepository } from '../../repository/prisma/AccountRepository';
import { AuthUseCase } from '../../useCase/AuthUseCase';

export function makeAuthUseCase() {
  const userRepository = new AccountRepository();
  const authUseCase = new AuthUseCase(userRepository);

  return authUseCase;
}
