"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var GuestbookService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestbookService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const services_1 = require("../../../shared/database/services");
let GuestbookService = exports.GuestbookService = GuestbookService_1 = class GuestbookService {
    prisma;
    cacheManager;
    logger = new common_1.Logger(GuestbookService_1.name);
    MESSAGES_CACHE_KEY = 'messages';
    GuestBookMessageInclude = {
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
    constructor(prisma, cacheManager) {
        this.prisma = prisma;
        this.cacheManager = cacheManager;
    }
    async cacheMessages(take) {
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
        }
        catch (error) {
            this.logger.error('Failed to cache guestbook messages:', error);
        }
    }
    async getMessagesFromCache() {
        const cachedMessages = await this.cacheManager.get(this.MESSAGES_CACHE_KEY);
        if (cachedMessages)
            return cachedMessages;
        return this.cacheMessages();
    }
    async onModuleInit() {
        await this.cacheMessages();
    }
    async newMessage({ body }, userId) {
        const cachedMessages = await this.getMessagesFromCache();
        const existingMessage = cachedMessages.items.find((item) => item.body === body && item.authorId === userId);
        if (existingMessage) {
            throw new common_1.ConflictException(`Message ${body} already exists.`);
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
        }
        catch (error) {
            this.logger.error('Failed to create guestbook message:', error);
            throw new common_1.NotImplementedException('Failed to create guestbook message.');
        }
    }
    async editMessage(id, { body }, userId) {
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
        }
        catch (error) {
            this.logger.error('Failed to edit guestbook message:', error);
            throw new common_1.NotImplementedException('Failed to edit guestbook message.');
        }
    }
    async deleteMessage(id, userId) {
        const message = await this.findMessageById(id);
        try {
            return this.prisma.$transaction(async (prisma) => {
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
            }, { timeout: 50000 });
        }
        catch (error) {
            this.logger.error('Failed to delete guestbook message:', error);
            throw new common_1.NotImplementedException('Failed to delete guestbook message.');
        }
    }
    async getMessages({ take, }) {
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
        }
        catch (error) {
            this.logger.error('Failed to get guestbook messages:', error);
            throw new common_1.NotImplementedException('Failed to get guestbook messages.');
        }
    }
    async addReaction(id, { emoji }, userId) {
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
        }
        catch (error) {
            throw new common_1.ConflictException(`Reaction with emoji ${emoji} already exists.`);
        }
    }
    async removeReaction(id, { emoji }, userId) {
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
        }
        catch (error) {
            throw new common_1.NotFoundException(`Reaction with emoji ${emoji} not found.`);
        }
    }
    async findMessageById(id) {
        const cachedMessages = await this.getMessagesFromCache();
        const message = cachedMessages.items.find((item) => item.id === id);
        if (!message) {
            throw new common_1.NotFoundException(`Message with ID ${id} not found.`);
        }
        return message;
    }
};
exports.GuestbookService = GuestbookService = GuestbookService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [services_1.PrismaService, Function])
], GuestbookService);
//# sourceMappingURL=guestbook.service.js.map