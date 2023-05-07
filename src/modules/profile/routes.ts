import { jwtVerify } from '@/infra/server/middlewares/jwtVerify';
import { FastifyInstance } from 'fastify';
import { GetProfileController } from './controller/GetProfileController';

export async function ProfileRouter(app: FastifyInstance) {
	app.addHook('onRequest', jwtVerify);

	app.get('/', GetProfileController);
}
