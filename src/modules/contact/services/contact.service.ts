import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { TelegramService } from 'nestjs-telegram';
import { LocationService } from '../../../shared/location/services';

import { type ISecurityConfig, SecurityConfig } from '../../../config';

import { NewMessageDto } from '../dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    @Inject(SecurityConfig.KEY)
    private readonly securityConfig: ISecurityConfig,
    private readonly locationService: LocationService,
    private readonly telegram: TelegramService,
  ) {}

  async newMessage(ip: string, { message }: NewMessageDto) {
    const location = await this.locationService.getLocation(ip);

    try {
      const template = () => {
        let msg = `<b>${message}</b>\n`;
        msg += `IP: <b>${ip}</b>\n`;
        msg += `Location: <b>${location.city}, ${location.country}, ${location.region}</b>\n`;
        msg += `Timezone: <b>${location.timezone}</b>\n`;
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
