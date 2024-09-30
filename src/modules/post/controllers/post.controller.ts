import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { Public } from '../../auth/common/decorators';

import { PostService } from '../services';

@Public()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('views/:slug')
  @HttpCode(HttpStatus.OK)
  async handleView(@Param('slug') slug: string) {
    return this.postService.addPostView(slug);
  }

  @Get('views')
  @HttpCode(HttpStatus.OK)
  async getViews() {
    return this.postService.getPostViews();
  }
}
