import * as z from 'nestjs-zod/z';
declare const CreateUserDto_base: import("nestjs-zod").ZodDto<{
    name?: string;
    surname?: string;
    email?: string;
    photo?: string;
}, z.ZodObjectDef<{
    name: z.ZodString;
    surname: z.ZodString;
    email: z.ZodString;
    photo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny>, {
    name?: string;
    surname?: string;
    email?: string;
    photo?: string;
}>;
export declare class CreateUserDto extends CreateUserDto_base {
}
export {};
