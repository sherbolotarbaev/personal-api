import { Module } from '@nestjs/common';

import { GuestbookController } from './controllers';
import { GuestbookService } from './services';

@Module({
  controllers: [GuestbookController],
  providers: [GuestbookService],
})
export class GuestbookModule {}
