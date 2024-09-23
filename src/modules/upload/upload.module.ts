import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { Module } from '@nestjs/common';

import { UploadController } from './controllers';
import { UploadService } from './services';

@Module({
  imports: [FastifyMulterModule],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
