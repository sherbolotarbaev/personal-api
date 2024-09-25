import { Module } from '@nestjs/common';

import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

import {
  redisRegToken,
  type ConfigKeyPaths,
  type IRedisConfig,
} from '~/config';

import * as redisStore from 'cache-manager-redis-store';

const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async (configService: ConfigService<ConfigKeyPaths>) => {
    const redisConfig = configService.get<IRedisConfig>(redisRegToken);
    return {
      ...redisConfig,
      store: redisStore,
      no_ready_check: true, // Redis ready check disabled for faster startup
      connectTimeout: 5000, // Redis connection timeout in milliseconds
      socket: {
        reconnectStrategy: (retries: number) => Math.min(retries * 50, 500), // Reconnect strategy
        timeout: 10000, // Redis socket timeout in milliseconds
      },
    };
  },
  inject: [ConfigService],
};

@Module({
  imports: [CacheModule.registerAsync(RedisOptions)],
  controllers: [],
  providers: [],
})
export class RedisModule {}
