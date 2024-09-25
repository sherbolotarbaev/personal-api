"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLikeSchema = exports.PostViewSchema = exports.GuestBookMessageReactionSchema = exports.GuestBookMessageSchema = exports.GuestBookMessageAuthorSchema = exports.UserSchema = exports.UserMetaDataSchema = void 0;
const client_1 = require("@prisma/client");
const z_1 = require("nestjs-zod/z");
exports.UserMetaDataSchema = z_1.z.object({
    ip: z_1.z.string(),
    city: z_1.z.string().optional(),
    region: z_1.z.string().optional(),
    country: z_1.z.string().optional(),
    timezone: z_1.z.string().optional(),
    lastSeen: z_1.z.date(),
    device: z_1.z.string().optional(),
});
exports.UserSchema = z_1.z.object({
    id: z_1.z.number(),
    role: z_1.z.nativeEnum(client_1.UserRole),
    email: z_1.z.string().email(),
    name: z_1.z.string(),
    surname: z_1.z.string(),
    photo: z_1.z.string().optional(),
    isActive: z_1.z.boolean(),
    isVerified: z_1.z.boolean(),
    createdAt: z_1.z.date(),
    updatedAt: z_1.z.date(),
    metaData: exports.UserMetaDataSchema,
});
exports.GuestBookMessageAuthorSchema = z_1.z.object({
    name: z_1.z.string(),
    email: z_1.z.string().email(),
    photo: z_1.z.string(),
    isVerified: z_1.z.boolean(),
});
exports.GuestBookMessageSchema = z_1.z.object({
    id: z_1.z.number(),
    body: z_1.z.string(),
    isEdited: z_1.z.boolean(),
    createdAt: z_1.z.date(),
    updatedAt: z_1.z.date(),
    author: exports.GuestBookMessageAuthorSchema,
});
exports.GuestBookMessageReactionSchema = z_1.z.object({
    messageId: z_1.z.number(),
    userId: z_1.z.number(),
    emoji: z_1.z.string(),
});
exports.PostViewSchema = z_1.z.object({
    slug: z_1.z.string(),
    viewsCount: z_1.z.number(),
    likesCount: z_1.z.number(),
});
exports.PostLikeSchema = z_1.z.object({
    userId: z_1.z.number(),
    slug: z_1.z.string(),
});
//# sourceMappingURL=schema.js.map