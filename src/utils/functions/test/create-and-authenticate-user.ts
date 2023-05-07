import { prisma } from '@/libs/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance) {
	await prisma.account.create({
		data: {
			email: 'jhondoe@example.com',
			password: await hash('123456', 6),
			profile: {
				create: {
					name: 'Jhon Doe',
					accountId: '1',
				},
			},
		},
	});

	const authResponse = await request(app.server).post('/v1/account/auth').send({
		email: 'jhondoe@example.com',
		password: '123456',
	});

	const { token } = authResponse.body;

	return {
		token,
	};
}
