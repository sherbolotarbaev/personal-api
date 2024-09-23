import { Global, Module } from '@nestjs/common';

// import { UserService } from '~/modules/user/services';
import { UserService } from '../../modules/user/services'; // fix: vercel issue

import { OtpController } from './controllers';
import { OtpService } from './services';

@Global()
@Module({
  controllers: [OtpController],
  providers: [OtpService, UserService],
  exports: [OtpService],
})
export class OtpModule {}
