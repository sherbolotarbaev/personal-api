import { createZodDto } from 'nestjs-zod';
import * as z from 'nestjs-zod/z';

const EditMeSchema = z.object(
  {
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
  },
  {
    required_error: 'Request body is required and cannot be empty.',
  },
);

export class EditMeDto extends createZodDto(EditMeSchema) {}
