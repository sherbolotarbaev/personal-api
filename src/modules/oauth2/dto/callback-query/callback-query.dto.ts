import { createZodDto } from 'nestjs-zod';
import * as z from 'nestjs-zod/z';

const CallbackQuerySchema = z.object({
  code: z.string({
    required_error: 'Query parameter `code` is required and cannot be empty.',
    message: 'Query parameter `code` must be a string.',
  }),
  state: z.string({
    required_error: 'Query parameter `state` is required and cannot be empty.',
    message: 'Query parameter `state` must be a string.',
  }),
});

export class CallbackQueryDto extends createZodDto(CallbackQuerySchema) {}
