import { createZodDto } from 'nestjs-zod';
import * as z from 'nestjs-zod/z';

const MessageSchema = z.object({
  body: z.string({ message: 'Body must be a string.' }),
});

export class MessageDto extends createZodDto(MessageSchema) {}
