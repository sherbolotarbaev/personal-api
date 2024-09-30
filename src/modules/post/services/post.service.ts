import { Injectable, Logger, NotImplementedException } from '@nestjs/common';

import { PrismaService } from '../../../shared/database/services';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(private readonly prisma: PrismaService) {}

  public async addPostView(slug: string): Promise<IPostView> {
    try {
      const view = await this.prisma.postView.upsert({
        where: {
          slug,
        },
        create: {
          slug,
          viewsCount: 1,
        },
        update: {
          viewsCount: {
            increment: 1,
          },
        },
      });
      return view;
    } catch (error) {
      this.logger.error('Failed to add view:', error);
      throw new NotImplementedException('Failed to add view.');
    }
  }

  public async getPostViews(): Promise<IPostView[]> {
    try {
      const views = await this.prisma.postView.findMany();
      return views;
    } catch (error) {
      this.logger.error('Failed to get views:', error);
      throw new NotImplementedException('Failed to get views.');
    }
  }
}
