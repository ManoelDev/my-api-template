import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeAuthUseCase } from './factory/makeAuthUseCase';
import { trimString } from '@/utils/functions/trimString';

const AuthBodySchema = z.object({
	email: z.preprocess(trimString, z.string().email()),
	password: z.string().min(6).max(20),
});

export type AuthAccountType = z.infer<typeof AuthBodySchema>;

export async function AuthController(request: FastifyRequest, reply: FastifyReply) {
	const { email, password } = AuthBodySchema.parse(request.body);

	const authUseCase = makeAuthUseCase();

	try {
		const { account } = await authUseCase.execute({ email, password });
		const token = await reply.jwtSign({}, { sign: { sub: account.id } });
		const refreshToken = await reply.jwtSign({}, { sign: { sub: account.id, expiresIn: '7d' } });

		return reply
			.setCookie('refreshToken', refreshToken, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true,
			})
			.status(200)
			.send({ token });
	} catch (error) {
		return reply.status(400).send(error);
	}
}
