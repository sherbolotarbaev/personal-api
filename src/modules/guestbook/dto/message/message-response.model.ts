import * as z from 'nestjs-zod/z';
// import { GuestBookMessageSchema } from '~/types/schema';
import { GuestBookMessageSchema } from '../../../../types/schema'; // fix: vercel issue

const MessageResponseSchema = z.object({
  message: GuestBookMessageSchema,
});

export type MessageResponseModel = z.infer<typeof MessageResponseSchema>;
