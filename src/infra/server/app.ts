import { AppRoutesV1 } from '@/router/v1';
import { env } from '../env';
import fastify from 'fastify';
import { ZodError } from 'zod';

import cors from '@fastify/cors';

import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

export const app = fastify();

app.register(cors, {
	origin: env.CORS_ORIGIN,
	hook: 'preHandler',
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false,
	},
	sign: {
		expiresIn: '10m',
	},
});
app.register(fastifyCookie);

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		reply.status(400).send({ statusCode: 400, ...error.issues[0] });
	}
	if (env.NODE_ENV !== 'development') {
		console.error(error);
	} else {
		//
	}
	reply.send(error);
});

app.register(AppRoutesV1, { prefix: '/v1' });

app.setNotFoundHandler((_, reply) => {
	reply.status(404).send({ error: 'Not found' });
});
