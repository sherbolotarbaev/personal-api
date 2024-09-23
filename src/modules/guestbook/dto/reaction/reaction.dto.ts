import { createZodDto } from 'nestjs-zod';
import * as z from 'nestjs-zod/z';

const ReactionSchema = z.object({
  emoji: z.string({ message: 'Emoji must be a string.' }),
});

export class ReactionDto extends createZodDto(ReactionSchema) {}
