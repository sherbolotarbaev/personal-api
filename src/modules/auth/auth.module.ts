import { Module } from '@nestjs/common';
import { PassportModule, type IAuthModuleOptions } from '@nestjs/passport';

import { jwtRegToken } from '~/config';
import { UserService } from '../user/services';

import { AccountController, AuthController } from './controllers';
import { AuthService } from './services';

const PassportOptions: IAuthModuleOptions = {
  defaultStrategy: jwtRegToken,
};

@Module({
  imports: [PassportModule.register(PassportOptions)],
  controllers: [AuthController, AccountController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
