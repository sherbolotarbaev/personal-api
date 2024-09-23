import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { AuthUser } from '../common/decorators';
// import { Ip } from '~/decorators/ip.decorator';
import { Ip } from '../../../common/decorators/ip.decorator'; // fix: vercel issue
// import { UserAgent } from '~/common/decorators/user-agent.decorator';
import { UserAgent } from '../../../common/decorators/user-agent.decorator'; // fix: vercel issue
// import { IUserAgent } from '~/utils/user-agent/interfaces';
import { IUserAgent } from '../../../utils/user-agent/interfaces'; // fix: vercel issue
// import { setCookie } from '~/utils/cookie'
import { setCookie } from '../../../utils/cookie'; // fix: vercel issue

import { EditMeDto } from '../dto';
import { AuthService } from '../services';

@Controller()
export class AccountController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getMe(
    @AuthUser() { id: userId }: IUser,
    @Ip() ip: string,
    @UserAgent() userAgent: IUserAgent,
  ) {
    return this.authService.getMe(userId, ip, userAgent);
  }

  @Patch('me')
  @HttpCode(HttpStatus.OK)
  async editMe(@AuthUser() { id: userId }: IUser, @Body() dto: EditMeDto) {
    return this.authService.editMe(userId, dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() request: FastifyRequest, @Res() response: FastifyReply) {
    setCookie(request, response, 'session', undefined);
    return response.status(200).redirect('/');
  }
}
