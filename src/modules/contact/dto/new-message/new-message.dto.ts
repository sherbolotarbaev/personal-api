import { createZodDto } from 'nestjs-zod';
import * as z from 'nestjs-zod/z';

const NewMessageSchema = z.object(
  {
    message: z.string(),
  },
  {
    required_error: 'Request body is required and cannot be empty.',
  },
);

export class NewMessageDto extends createZodDto(NewMessageSchema) {}
