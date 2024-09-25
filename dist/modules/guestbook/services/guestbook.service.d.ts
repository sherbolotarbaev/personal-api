import { type Cache } from '@nestjs/cache-manager';
import { PrismaService } from '../../../shared/database/services';
import { GetMessagesDto, GetMessagesResponseModel, MessageDto, MessageResponseModel, ReactionDto, ReactionResponseModel } from '../dto';
export declare class GuestbookService {
    private readonly prisma;
    private readonly cacheManager;
    private readonly logger;
    private readonly MESSAGES_CACHE_KEY;
    private GuestBookMessageInclude;
    constructor(prisma: PrismaService, cacheManager: Cache);
    private cacheMessages;
    private getMessagesFromCache;
    onModuleInit(): Promise<void>;
    newMessage({ body }: MessageDto, userId: number): Promise<MessageResponseModel>;
    editMessage(id: number, { body }: MessageDto, userId: number): Promise<MessageResponseModel>;
    deleteMessage(id: number, userId: number): Promise<MessageResponseModel>;
    getMessages({ take, }: GetMessagesDto): Promise<GetMessagesResponseModel>;
    addReaction(id: number, { emoji }: ReactionDto, userId: number): Promise<ReactionResponseModel>;
    removeReaction(id: number, { emoji }: ReactionDto, userId: number): Promise<ReactionResponseModel>;
    private findMessageById;
}
