import { createZodDto } from 'nestjs-zod';
import * as z from 'nestjs-zod/z';

const CallbackQuerySchema = z.object({
  code: z
    .string({
      message: 'Query parameter `code` must be a string.',
    })
    .optional(),
  state: z
    .string({
      message: 'Query parameter `state` must be a string.',
    })
    .optional(),
  error: z
    .string({
      message: 'Query parameter `error` must be a string.',
    })
    .optional(),
  next: z
    .string({
      message: 'Query parameter `next` must be a string.',
    })
    .optional(),
});

export class CallbackQueryDto extends createZodDto(CallbackQuerySchema) {}
