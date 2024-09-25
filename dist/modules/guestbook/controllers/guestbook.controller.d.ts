import { GetMessagesDto, MessageDto, ReactionDto } from '../dto';
import { GuestbookService } from '../services';
export declare class GuestbookController {
    private readonly guestbookService;
    constructor(guestbookService: GuestbookService);
    newMessage(dto: MessageDto, { id: userId }: IUser): Promise<{
        message?: {
            id?: number;
            createdAt?: Date;
            updatedAt?: Date;
            body?: string;
            isEdited?: boolean;
            author?: {
                name?: string;
                email?: string;
                photo?: string;
                isVerified?: boolean;
            };
        };
    }>;
    editMessage(id: number, dto: MessageDto, { id: userId }: IUser): Promise<{
        message?: {
            id?: number;
            createdAt?: Date;
            updatedAt?: Date;
            body?: string;
            isEdited?: boolean;
            author?: {
                name?: string;
                email?: string;
                photo?: string;
                isVerified?: boolean;
            };
        };
    }>;
    deleteMessage(id: number, { id: userId }: IUser): Promise<{
        message?: {
            id?: number;
            createdAt?: Date;
            updatedAt?: Date;
            body?: string;
            isEdited?: boolean;
            author?: {
                name?: string;
                email?: string;
                photo?: string;
                isVerified?: boolean;
            };
        };
    }>;
    getMessages(queryDto: GetMessagesDto): Promise<{
        count?: number;
        totalCount?: number;
        items?: {
            id?: number;
            createdAt?: Date;
            updatedAt?: Date;
            body?: string;
            isEdited?: boolean;
            author?: {
                name?: string;
                email?: string;
                photo?: string;
                isVerified?: boolean;
            };
        }[];
    }>;
    addReaction(id: number, dto: ReactionDto, { id: userId }: IUser): Promise<{
        reaction?: {
            userId?: number;
            messageId?: number;
            emoji?: string;
        };
    }>;
    removeReaction(id: number, dto: ReactionDto, { id: userId }: IUser): Promise<{
        reaction?: {
            userId?: number;
            messageId?: number;
            emoji?: string;
        };
    }>;
}
