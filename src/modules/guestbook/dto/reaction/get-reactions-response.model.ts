import * as z from 'nestjs-zod/z';
import { GuestBookMessageReactionSchema } from '../../../../types/schema';

const GetReactionsResponseSchema = z.object({
  reactions: z.array(GuestBookMessageReactionSchema),
});

export type GetReactionsResponseModel = z.infer<
  typeof GetReactionsResponseSchema
>;
