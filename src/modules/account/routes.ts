import { FastifyInstance } from 'fastify';
import { CreateAccountController } from './controller/CreateAccountController';
import { AuthController } from './controller/AuthController';

export async function AccountRouter(app: FastifyInstance) {
	app.post('/', CreateAccountController);
	app.post('/auth', AuthController);
}
