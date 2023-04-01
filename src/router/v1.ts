import { UsersRouter } from '@/modules/user/routes';
import { FastifyInstance } from 'fastify';

export async function AppRoutesV1(app: FastifyInstance) {
  app.register(UsersRouter, { prefix: '/account' });
}
