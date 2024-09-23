import { createZodDto } from 'nestjs-zod';
import * as z from 'nestjs-zod/z';

const SignInSchema = z.object(
  {
    email: z
      .string({
        required_error: 'Email is required and cannot be empty.',
      })
      .email({ message: 'Invalid email address.' }),

    otp: z
      .string({
        required_error: 'Verification code is required and cannot be empty.',
      })
      .length(6, {
        message: '6-digit verification code required.',
      }),
  },
  {
    required_error: 'Request body is required and cannot be empty.',
  },
);

export class SignInDto extends createZodDto(SignInSchema) {}
