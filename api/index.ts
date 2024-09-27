import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import bootstrap from '../src/main';

let app: FastifyInstance;

export default async (request: FastifyRequest, response: FastifyReply) => {
  if (!app) {
    app = await bootstrap();
  }
  app.ready().then(() => {
    app.server.emit('request', request, response);
  });
};
