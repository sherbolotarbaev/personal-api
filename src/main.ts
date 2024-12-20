import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';

import { fastifyApp } from './common/adapters/fastify.adapter';
import { ZodValidationPipe } from './common/pipes/zod.pipe';
import { appRegToken, securityRegToken, type ConfigKeyPaths } from './config';

import { AppModule } from './app.module';

import fastifyCompress from '@fastify/compress';
import fastifyCookie, { type FastifyCookieOptions } from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import fastifyHelmet from '@fastify/helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyApp,
    {
      bufferLogs: true,
      snapshot: true,
    },
  );

  const configService = app.get(ConfigService<ConfigKeyPaths>);
  const { frontBaseUrl } = configService.get(appRegToken, {
    infer: true,
  });
  const { cookieSecret } = configService.get(securityRegToken, {
    infer: true,
  });

  await app.register<FastifyCookieOptions>(fastifyCookie, {
    secret: cookieSecret,
  });

  await app.register(fastifyHelmet);

  await app.register(fastifyCsrfProtection);

  await app.register(fastifyCors, {
    origin: [frontBaseUrl, 'https://kyrgyzstan-info.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  await app.register(fastifyCompress);

  app.useGlobalPipes(new ZodValidationPipe());

  await app.init();

  return app.getHttpAdapter().getInstance();
}

export default bootstrap;
