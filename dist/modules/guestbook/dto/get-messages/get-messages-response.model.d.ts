import * as z from 'nestjs-zod/z';
declare const GetMessagesResponseSchema: z.ZodObject<{
    totalCount: z.ZodNumber;
    count: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
}, "strip", z.ZodTypeAny, {
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
}, {
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
export type GetMessagesResponseModel = z.infer<typeof GetMessagesResponseSchema>;
export {};
