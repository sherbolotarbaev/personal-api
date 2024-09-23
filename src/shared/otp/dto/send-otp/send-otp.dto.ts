import { createZodDto } from 'nestjs-zod';
import * as z from 'nestjs-zod/z';

const SendOtpSchema = z.object(
  {
    email: z
      .string({
        required_error: 'Email is required and cannot be empty.',
      })
      .email({ message: 'Invalid email address.' }),
  },
  {
    required_error: 'Request body is required and cannot be empty.',
  },
);

export class SendOtpDto extends createZodDto(SendOtpSchema) {}
