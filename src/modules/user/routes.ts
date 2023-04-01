import { FastifyInstance } from 'fastify';
import { AuthenticateController } from './controller/AuthenticateController';
import { RefreshTokenController } from './controller/RefreshAuthenticateController';
import { CreateUsersController } from './controller/CreateUsersController';

export async function UsersRouter(app: FastifyInstance) {
  app.post('/', CreateUsersController);

  app.post('/session', AuthenticateController);
  app.patch('/refresh', RefreshTokenController);
}
