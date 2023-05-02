import { AccountRepository } from '../../repository/prisma/AccountRepository';
import { CreateAccountUseCase } from '../../useCase/CreateAccountUseCase';

export function makeCreateAccountUseCase() {
  const accountRepository = new AccountRepository();
  const createAccountUseCase = new CreateAccountUseCase(accountRepository);

  return createAccountUseCase;
}
