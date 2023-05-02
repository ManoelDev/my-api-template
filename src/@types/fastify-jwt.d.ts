import '@fastify/jwt';

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: 'ADMINISTRATOR' | 'MODERATOR' | 'USER';
      sub: string;
    };
  }
}
