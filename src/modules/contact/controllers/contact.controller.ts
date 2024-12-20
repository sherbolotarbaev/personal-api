import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Ip } from '../../../common/decorators/ip.decorator';
import { Public } from '../../auth/common/decorators';

import { NewMessageDto } from '../dto';
import { ContactService } from '../services';

@Public()
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async newMessage(@Ip() ip: string, @Body() dto: NewMessageDto) {
    return this.contactService.newMessage(ip, dto);
  }
}
