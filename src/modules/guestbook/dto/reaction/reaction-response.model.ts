import * as z from 'nestjs-zod/z';
// import { GuestBookMessageReactionSchema } from '~/types/schema';
import { GuestBookMessageReactionSchema } from '../../../../types/schema'; // fix: vercel issue

const ReactionResponseSchema = z.object({
  reaction: GuestBookMessageReactionSchema,
});

export type ReactionResponseModel = z.infer<typeof ReactionResponseSchema>;
