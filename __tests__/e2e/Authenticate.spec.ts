import { app } from '@/infra/server/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, it, expect } from 'vitest';

const BodyObject = {
	email: 'jhondoe@example.com',
	password: '123456',
};

describe('Authenticate (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});
	afterAll(async () => {
		await app.close();
	});

	it('should be able to authenticate', async () => {
		await request(app.server).post('/v1/account').send(BodyObject);

		const response = await request(app.server).post('/v1/account/auth').send(BodyObject);

		expect(response.status).toEqual(200);
		expect(response.body).toEqual({
			token: expect.any(String),
		});
	});
});
