import { type Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import type { GuestBookMessage, Prisma } from '@prisma/client';

import { PrismaService } from '~/shared/database/services';

import {
  GetMessagesDto,
  GetMessagesResponseModel,
  MessageDto,
  MessageResponseModel,
  ReactionDto,
  ReactionResponseModel,
} from '../dto';

@Injectable()
export class GuestbookService {
  private readonly logger = new Logger(GuestbookService.name);

  private readonly MESSAGES_CACHE_KEY = 'messages';

  private GuestBookMessageInclude: Prisma.GuestBookMessageInclude = {
    author: {
      select: {
        name: true,
        email: true,
        photo: true,
        isVerified: true,
      },
    },
    reactions: {
      select: {
        emoji: true,
        userId: true,
      },
    },
  };

  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private async cacheMessages(take?: number): Promise<{
    items: GuestBookMessage[];
    totalCount: number;
  }> {
    await this.cacheManager.del(this.MESSAGES_CACHE_KEY);

    try {
      const [totalCount, items] = await Promise.all([
        this.prisma.guestBookMessage.count(),
        this.prisma.guestBookMessage.findMany({
          take,
          orderBy: { createdAt: 'desc' },
          include: this.GuestBookMessageInclude,
        }),
      ]);

      this.logger.log('Caching messages...');
      await this.cacheManager.set(this.MESSAGES_CACHE_KEY, {
        items,
        totalCount,
      });

      return {
        items,
        totalCount,
      };
    } catch (error) {
      this.logger.error('Failed to cache guestbook messages:', error);
    }
  }

  private async getMessagesFromCache(): Promise<{
    items: GuestBookMessage[];
    totalCount: number;
  }> {
    const cachedMessages: {
      items: GuestBookMessage[];
      totalCount: number;
    } = await this.cacheManager.get(this.MESSAGES_CACHE_KEY);

    if (cachedMessages) return cachedMessages;

    return this.cacheMessages();
  }

  public async onModuleInit(): Promise<void> {
    await this.cacheMessages();
  }

  public async newMessage(
    { body }: MessageDto,
    userId: number,
  ): Promise<MessageResponseModel> {
    const cachedMessages = await this.getMessagesFromCache();
    const existingMessage = cachedMessages.items.find(
      (item) => item.body === body && item.authorId === userId,
    );

    if (existingMessage) {
      throw new ConflictException(`Message ${body} already exists.`);
    }

    try {
      const message = await this.prisma.guestBookMessage.create({
        data: {
          body,
          authorId: userId,
        },
      });

      this.cacheMessages();

      return {
        message,
      };
    } catch (error) {
      this.logger.error('Failed to create guestbook message:', error);
      throw new NotImplementedException('Failed to create guestbook message.');
    }
  }

  public async editMessage(
    id: number,
    { body }: MessageDto,
    userId: number,
  ): Promise<MessageResponseModel> {
    const message = await this.findMessageById(id);

    try {
      const updatedMessage = await this.prisma.guestBookMessage.update({
        where: {
          id: message.id,
          authorId: userId,
        },
        data: {
          body,
          authorId: userId,
        },
      });

      this.cacheMessages();

      return {
        message: updatedMessage,
      };
    } catch (error) {
      this.logger.error('Failed to edit guestbook message:', error);
      throw new NotImplementedException('Failed to edit guestbook message.');
    }
  }

  public async deleteMessage(
    id: number,
    userId: number,
  ): Promise<MessageResponseModel> {
    const message = await this.findMessageById(id);

    try {
      return this.prisma.$transaction(
        async (prisma) => {
          await prisma.messageReaction.deleteMany({
            where: {
              messageId: message.id,
            },
          });

          const deletedMessage = await prisma.guestBookMessage.delete({
            where: {
              id: message.id,
              authorId: userId,
            },
          });

          this.cacheMessages();

          return {
            message: deletedMessage,
          };
        },
        { timeout: 50000 }, // 50 seconds
      );
    } catch (error) {
      this.logger.error('Failed to delete guestbook message:', error);
      throw new NotImplementedException('Failed to delete guestbook message.');
    }
  }

  public async getMessages({
    take,
  }: GetMessagesDto): Promise<GetMessagesResponseModel> {
    const cachedMessages = await this.getMessagesFromCache();

    if (cachedMessages) {
      this.logger.log('Returning cached messages...');
      return {
        totalCount: cachedMessages.totalCount,
        count: cachedMessages.items.length,
        items: cachedMessages.items,
      };
    }

    try {
      const { items, totalCount } = await this.cacheMessages(take);
      return {
        totalCount,
        count: items.length,
        items,
      };
    } catch (error) {
      this.logger.error('Failed to get guestbook messages:', error);
      throw new NotImplementedException('Failed to get guestbook messages.');
    }
  }

  public async addReaction(
    id: number,
    { emoji }: ReactionDto,
    userId: number,
  ): Promise<ReactionResponseModel> {
    const message = await this.findMessageById(id);

    try {
      const reaction = await this.prisma.messageReaction.create({
        data: {
          emoji,
          messageId: message.id,
          userId,
        },
      });

      this.cacheMessages();

      return {
        reaction,
      };
    } catch (error) {
      throw new ConflictException(
        `Reaction with emoji ${emoji} already exists.`,
      );
    }
  }

  public async removeReaction(
    id: number,
    { emoji }: ReactionDto,
    userId: number,
  ): Promise<ReactionResponseModel> {
    const message = await this.findMessageById(id);

    try {
      const reaction = await this.prisma.messageReaction.delete({
        where: {
          userId_messageId_emoji: {
            emoji,
            messageId: message.id,
            userId,
          },
        },
      });

      this.cacheMessages();

      return {
        reaction,
      };
    } catch (error) {
      throw new NotFoundException(`Reaction with emoji ${emoji} not found.`);
    }
  }

  private async findMessageById(id: number): Promise<GuestBookMessage> {
    const cachedMessages = await this.getMessagesFromCache();

    const message = cachedMessages.items.find((item) => item.id === id);
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found.`);
    }

    return message;
  }
}
