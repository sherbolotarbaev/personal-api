import * as z from 'nestjs-zod/z';
declare const ReactionResponseSchema: z.ZodObject<{
    reaction: z.ZodObject<{
        messageId: z.ZodNumber;
        userId: z.ZodNumber;
        emoji: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        userId?: number;
        messageId?: number;
        emoji?: string;
    }, {
        userId?: number;
        messageId?: number;
        emoji?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    reaction?: {
        userId?: number;
        messageId?: number;
        emoji?: string;
    };
}, {
    reaction?: {
        userId?: number;
        messageId?: number;
        emoji?: string;
    };
}>;
export type ReactionResponseModel = z.infer<typeof ReactionResponseSchema>;
export {};
