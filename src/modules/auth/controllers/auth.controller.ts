import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { Domain, Public } from '../common/decorators';
import { SessionInterceptor } from '../common/interceptors';

import { SignInDto, SignUpDto } from '../dto';
import { AuthService } from '../services';

@Public()
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @UseInterceptors(SessionInterceptor)
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto: SignUpDto, @Domain() domain: string | undefined) {
    return this.authService.signUp(dto, domain);
  }

  @Post('sign-in')
  @UseInterceptors(SessionInterceptor)
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: SignInDto, @Domain() domain: string | undefined) {
    return this.authService.signIn(dto, domain);
  }
}
