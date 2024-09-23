import { UserRole } from '@prisma/client';
import { z } from 'nestjs-zod/z';

export const UserMetaDataSchema = z.object({
  ip: z.string(),
  city: z.string().optional(),
  region: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  lastSeen: z.date(),
  device: z.string().optional(),
});

export const UserSchema = z.object({
  id: z.number(),
  role: z.nativeEnum(UserRole),
  email: z.string().email(),
  name: z.string(),
  surname: z.string(),
  photo: z.string().optional(),
  isActive: z.boolean(),
  isVerified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  metaData: UserMetaDataSchema,
});

export const GuestBookMessageAuthorSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  photo: z.string(),
  isVerified: z.boolean(),
});

export const GuestBookMessageSchema = z.object({
  id: z.number(),
  body: z.string(),
  isEdited: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  author: GuestBookMessageAuthorSchema,
});

export const GuestBookMessageReactionSchema = z.object({
  messageId: z.number(),
  userId: z.number(),
  emoji: z.string(),
});

export const PostViewSchema = z.object({
  slug: z.string(),
  viewsCount: z.number(),
  likesCount: z.number(),
});

export const PostLikeSchema = z.object({
  userId: z.number(),
  slug: z.string(),
});
