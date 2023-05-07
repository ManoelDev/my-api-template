import { trimString } from '@/utils/functions/trimString';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreateAccountUseCase } from './factory/makeCreateAccountUseCase';

export const CreateAccountSchema = z.object({
	email: z.preprocess(trimString, z.string().email()),
	password: z.string().min(6).max(20),
});

export type CreateAccountType = z.infer<typeof CreateAccountSchema>;

export async function CreateAccountController(request: FastifyRequest, reply: FastifyReply) {
	const { email, password } = CreateAccountSchema.parse(request.body);
	const registerUseCase = makeCreateAccountUseCase();

	try {
		await registerUseCase.execute({ email, password });
	} catch (error) {
		return reply.status(409).send(error);
	}

	return reply.status(201).send();
}
