import { app } from '@/infra/server/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const BodyObject = {
	email: 'jhondoe@example.com',
	password: '123456',
};

describe('createUser (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});
	afterAll(async () => {
		await app.close();
	});

	it('should be able create a user', async () => {
		const response = await request(app.server).post('/v1/account').send(BodyObject);

		expect(response.statusCode).toEqual(201);
	});

	it('Should not be able to register with same email twice', async () => {
		await request(app.server).post('/v1/account').send(BodyObject);
		const response = await request(app.server).post('/v1/account').send(BodyObject);

		expect(response.statusCode).toEqual(409);
		expect(response.body).toEqual(
			expect.objectContaining({
				error: 'Conflict',
				message: 'Email já cadastrado.',
			})
		);
	});
});
