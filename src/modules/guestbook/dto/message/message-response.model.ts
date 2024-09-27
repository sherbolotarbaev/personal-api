import * as z from 'nestjs-zod/z';
import { GuestBookMessageSchema } from '../../../../types/schema';

const MessageResponseSchema = z.object({
  message: GuestBookMessageSchema,
});

export type MessageResponseModel = z.infer<typeof MessageResponseSchema>;
