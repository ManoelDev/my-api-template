import { app } from '@/infra/server/app';
import request from 'supertest';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const BodyObject = {
  email: 'jhondoe@example.com',
  password: '123456',
};

describe('Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be able to refresh in token', async () => {
    const response = await request(app.server).post('/v1/account').send(BodyObject);

    const authResponse = await request(app.server).post('/v1/account/session').send(BodyObject);

    const refreshToken = authResponse.get('set-cookie');

    const refreshResponse = await request(app.server).patch('/v1/account/refresh').set('Cookie', refreshToken);

    expect(response.statusCode).toEqual(201);
    expect(refreshResponse.statusCode).toEqual(200);
    expect(refreshResponse.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );

    expect(refreshResponse.get('set-cookie')).toEqual(expect.arrayContaining([expect.stringContaining('refreshToken=')]));
  });
});
