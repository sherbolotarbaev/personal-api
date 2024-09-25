import * as z from 'nestjs-zod/z';
declare const MessageResponseSchema: z.ZodObject<{
    message: z.ZodObject<{
        id: z.ZodNumber;
        body: z.ZodString;
        isEdited: z.ZodBoolean;
        createdAt: z.ZodDate;
        updatedAt: z.ZodDate;
        author: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            photo: z.ZodString;
            isVerified: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            name?: string;
            email?: string;
            photo?: string;
            isVerified?: boolean;
        }, {
            name?: string;
            email?: string;
            photo?: string;
            isVerified?: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
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
    }, {
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
    }>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
export type MessageResponseModel = z.infer<typeof MessageResponseSchema>;
export {};
