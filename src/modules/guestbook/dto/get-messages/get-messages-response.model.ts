import * as z from 'nestjs-zod/z';
import { GuestBookMessageSchema } from '../../../../types/schema';

const GetMessagesResponseSchema = z.object({
  totalCount: z.number(),
  count: z.number(),
  items: z.array(GuestBookMessageSchema),
});

export type GetMessagesResponseModel = z.infer<
  typeof GetMessagesResponseSchema
>;
