import type { UserRole } from '@prisma/client';
import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: number;
      role: UserRole;
    };
  }
}
