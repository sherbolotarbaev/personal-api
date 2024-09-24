import { Logger } from '@nestjs/common';
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
      // forceCloseConnections: true,
    },
  );

  const configService = app.get(ConfigService<ConfigKeyPaths>);
  const { port, name, frontBaseUrl } = configService.get(appRegToken, {
    infer: true,
  });
  const { cookieSecret } = configService.get(securityRegToken, {
    infer: true,
  });

  const logger = new Logger(name);

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

  try {
    await app.listen(port, '0.0.0.0');
    const url = await app.getUrl();
    logger.log(`🦖 server is running on ${url}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}
export default bootstrap;
