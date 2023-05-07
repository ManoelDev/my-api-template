import { AccountRouter } from '@/modules/account/routes';
import { ProfileRouter } from '@/modules/profile/routes';
import { FastifyInstance } from 'fastify';

export async function AppRoutesV1(app: FastifyInstance) {
	app.register(AccountRouter, { prefix: '/account' });
	app.register(ProfileRouter, { prefix: '/profile' });
}
