import fastifyCompress from '@fastify/compress';
import fastifyCookie, { type FastifyCookieOptions } from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import fastifyHelmet from '@fastify/helmet';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from '../src/app.module';
import { fastifyApp } from '../src/common/adapters/fastify.adapter';
import { ZodValidationPipe } from '../src/common/pipes/zod.pipe';
import {
  appRegToken,
  securityRegToken,
  type ConfigKeyPaths,
} from '../src/config';

let app: NestFastifyApplication;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      fastifyApp,
      {
        bufferLogs: true,
        snapshot: true,
      },
    );

    const configService = app.get(ConfigService<ConfigKeyPaths>);
    const { frontBaseUrl } = configService.get(appRegToken, { infer: true });
    const { cookieSecret } = configService.get(securityRegToken, {
      infer: true,
    });

    await app.register<FastifyCookieOptions>(fastifyCookie, {
      secret: cookieSecret,
    });

    await app.register(fastifyHelmet);
    await app.register(fastifyCsrfProtection);
    await app.register(fastifyCors, {
      origin: frontBaseUrl,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    await app.register(fastifyCompress);

    app.useGlobalPipes(new ZodValidationPipe());

    await app.init();
  }
  return app;
}

export default async function handler(req, res) {
  const app = await bootstrap();
  const fastifyInstance = app.getHttpAdapter().getInstance();
  await fastifyInstance.ready();
  fastifyInstance.server.emit('request', req, res);
}
