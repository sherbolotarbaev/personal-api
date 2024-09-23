import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

// import { Public } from '~/modules/auth/common/decorators';
import { Public } from '../../../modules/auth/common/decorators'; // fix: vercel issue

import { SendOtpDto } from '../dto';
import { OtpService } from '../services';

@Public()
@Controller()
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() dto: SendOtpDto) {
    return this.otpService.sendOtp(dto);
  }
}
