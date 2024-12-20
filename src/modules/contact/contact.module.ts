import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TelegramModule } from 'nestjs-telegram';

import type { ConfigKeyPaths, ISecurityConfig } from '../../config';

import { ContactController } from './controllers';
import { ContactService } from './services';

@Module({
  imports: [
    TelegramModule.forRootAsync({
      useFactory: async (configService: ConfigService<ConfigKeyPaths>) => {
        const { telegramBotApiKey } =
          configService.get<ISecurityConfig>('security');

        return {
          botKey: telegramBotApiKey,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}
