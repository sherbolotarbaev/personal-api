import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { TelegramService } from 'nestjs-telegram';

import { type ISecurityConfig, SecurityConfig } from '../../../config';

import { NewMessageDto } from '../dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    @Inject(SecurityConfig.KEY)
    private readonly securityConfig: ISecurityConfig,
    private readonly telegram: TelegramService,
  ) {}

  async newMessage({ message }: NewMessageDto) {
    try {
      const template = () => {
        let msg = `<b>${message}</b>\n`;
        return msg;
      };

      await this.telegram
        .sendMessage({
          chat_id: this.securityConfig.telegramBotChatId,
          text: template(),
          parse_mode: 'html',
        })
        .toPromise();

      return { success: true };
    } catch (error) {
      this.logger.error('Failed to create new message:', error);
      throw new InternalServerErrorException(
        'Failed to create new contact message.',
      );
    }
  }
}
