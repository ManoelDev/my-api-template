import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeAuthenticateUseCase } from '../factory/makeAuthenticateUseCase';
import { trimString } from '@/utils/functions/trimString';

export async function AuthenticateController(request: FastifyRequest, reply: FastifyReply) {
  const AuthenticateBodySchema = z.object({
    email: z.preprocess(trimString, z.string().email()),
    password: z.string().min(6).max(20),
  });

  const { email, password } = AuthenticateBodySchema.parse(request.body);

  const authenticateUseCase = makeAuthenticateUseCase();

  try {
    const { account } = await authenticateUseCase.execute({ email, password });
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: account.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: account.id,
          expiresIn: '7d',
        },
      }
    );

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
