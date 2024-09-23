import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { UserService } from '../user/services';

import { OAuth2Controller } from './controllers';
import { OAuth2Service } from './services';

@Module({
  imports: [HttpModule],
  controllers: [OAuth2Controller],
  providers: [OAuth2Service, UserService],
})
export class Oauth2Module {}
