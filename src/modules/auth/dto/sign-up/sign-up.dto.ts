import { createZodDto } from 'nestjs-zod';
import * as z from 'nestjs-zod/z';

const SignUpSchema = z.object(
  {
    name: z
      .string()
      .min(1, { message: 'Name is required and cannot be empty.' })
      .regex(/^[A-Za-zА-Яа-яЁё]+$/, {
        message: 'Name must contain only letters.',
      })
      .min(2, { message: 'Name must be at least 2 characters long.' })
      .max(64, { message: 'Name cannot be longer than 64 characters.' }),

    surname: z
      .string()
      .min(1, { message: 'Surname is required and cannot be empty.' })
      .regex(/^[A-Za-zА-Яа-яЁё]+$/, {
        message: 'Surname must contain only letters.',
      })
      .min(2, { message: 'Surname must be at least 2 characters long.' })
      .max(64, { message: 'Surname cannot be longer than 64 characters.' }),

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

export class SignUpDto extends createZodDto(SignUpSchema) {}
