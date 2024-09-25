import { z } from 'nestjs-zod/z';
export declare const UserMetaDataSchema: z.ZodObject<{
    ip: z.ZodString;
    city: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
    lastSeen: z.ZodDate;
    device: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    ip?: string;
    city?: string;
    region?: string;
    country?: string;
    timezone?: string;
    lastSeen?: Date;
    device?: string;
}, {
    ip?: string;
    city?: string;
    region?: string;
    country?: string;
    timezone?: string;
    lastSeen?: Date;
    device?: string;
}>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodNumber;
    role: z.ZodNativeEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
    }>;
    email: z.ZodString;
    name: z.ZodString;
    surname: z.ZodString;
    photo: z.ZodOptional<z.ZodString>;
    isActive: z.ZodBoolean;
    isVerified: z.ZodBoolean;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    metaData: z.ZodObject<{
        ip: z.ZodString;
        city: z.ZodOptional<z.ZodString>;
        region: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        timezone: z.ZodOptional<z.ZodString>;
        lastSeen: z.ZodDate;
        device: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        ip?: string;
        city?: string;
        region?: string;
        country?: string;
        timezone?: string;
        lastSeen?: Date;
        device?: string;
    }, {
        ip?: string;
        city?: string;
        region?: string;
        country?: string;
        timezone?: string;
        lastSeen?: Date;
        device?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    surname?: string;
    email?: string;
    photo?: string;
    id?: number;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    isVerified?: boolean;
    role?: "USER" | "ADMIN";
    metaData?: {
        ip?: string;
        city?: string;
        region?: string;
        country?: string;
        timezone?: string;
        lastSeen?: Date;
        device?: string;
    };
}, {
    name?: string;
    surname?: string;
    email?: string;
    photo?: string;
    id?: number;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    isVerified?: boolean;
    role?: "USER" | "ADMIN";
    metaData?: {
        ip?: string;
        city?: string;
        region?: string;
        country?: string;
        timezone?: string;
        lastSeen?: Date;
        device?: string;
    };
}>;
export declare const GuestBookMessageAuthorSchema: z.ZodObject<{
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
export declare const GuestBookMessageSchema: z.ZodObject<{
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
export declare const GuestBookMessageReactionSchema: z.ZodObject<{
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
export declare const PostViewSchema: z.ZodObject<{
    slug: z.ZodString;
    viewsCount: z.ZodNumber;
    likesCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    slug?: string;
    viewsCount?: number;
    likesCount?: number;
}, {
    slug?: string;
    viewsCount?: number;
    likesCount?: number;
}>;
export declare const PostLikeSchema: z.ZodObject<{
    userId: z.ZodNumber;
    slug: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId?: number;
    slug?: string;
}, {
    userId?: number;
    slug?: string;
}>;
