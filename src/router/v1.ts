import { AccountRouter } from '@/modules/account/routes';
import { FastifyInstance } from 'fastify';

export async function AppRoutesV1(app: FastifyInstance) {
  app.register(AccountRouter, { prefix: '/account' });
}
