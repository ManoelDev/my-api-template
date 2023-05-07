import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeGetProfilesUseCase } from './factory/makeGetProfilesUseCase';

export const GetProfileSchema = z.object({
	sub: z.string(),
});

export type GetProfileType = z.infer<typeof GetProfileSchema>;

export async function GetProfileController(request: FastifyRequest, reply: FastifyReply) {
	const { sub } = GetProfileSchema.parse(request.user);

	const profilesUseCase = makeGetProfilesUseCase();

	try {
		const response = await profilesUseCase.execute(sub);
		return reply.status(200).send(response);
	} catch (error) {
		return reply.status(409).send(error);
	}
}
