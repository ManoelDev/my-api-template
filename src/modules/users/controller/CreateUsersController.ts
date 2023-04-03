import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeCreateUserUseCase } from '../factory/makeCreateUsersUseCase';
import { trimString } from '@/utils/functions/trimString';

export async function CreateUsersController(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(3).max(20),
    email: z.preprocess(trimString, z.string().email()),
    password: z.string().min(6).max(20),
  });

  const { email, password, name } = registerBodySchema.parse(request.body);
  const registerUseCase = makeCreateUserUseCase();

  try {
    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    return reply.status(409).send(error);
  }
  // await registerUseCase.execute({ name, email, password });

  return reply.status(201).send();
}
