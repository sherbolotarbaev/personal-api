import { Global, Module } from '@nestjs/common';

import { UserService } from '../../modules/user/services';

import { OtpController } from './controllers';
import { OtpService } from './services';

@Global()
@Module({
  controllers: [OtpController],
  providers: [OtpService, UserService],
  exports: [OtpService],
})
export class OtpModule {}
