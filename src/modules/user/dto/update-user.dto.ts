import { createZodDto } from 'nestjs-zod';
import * as z from 'nestjs-zod/z';

const UpdateUserSchema = z.object({
  name: z
    .string()
    .regex(/^[A-Za-zА-Яа-яЁё]+$/, {
      message: 'Name must contain only letters.',
    })
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(64, { message: 'Name cannot be longer than 64 characters.' })
    .optional(),

  surname: z
    .string()
    .regex(/^[A-Za-zА-Яа-яЁё]+$/, {
      message: 'Surname must contain only letters.',
    })
    .min(2, { message: 'Surname must be at least 2 characters long.' })
    .max(64, { message: 'Surname cannot be longer than 64 characters.' })
    .optional(),

  photo: z.string().optional(),

  email: z.string().email({ message: 'Invalid email address.' }).optional(),
});

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
