import { Module } from '@nestjs/common';

import { PostController } from './controllers';
import { PostService } from './services';

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
