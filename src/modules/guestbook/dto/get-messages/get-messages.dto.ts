import { createZodDto } from 'nestjs-zod';
import * as z from 'nestjs-zod/z';

const GetMessagesSchema = z.object({
  take: z.coerce
    .number({ message: 'Query parameter `take` must be a number.' })
    .optional(),
});

export class GetMessagesDto extends createZodDto(GetMessagesSchema) {}
