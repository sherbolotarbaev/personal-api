import * as z from 'nestjs-zod/z';
declare const UpdateUserDto_base: import("nestjs-zod").ZodDto<{
    name?: string;
    surname?: string;
    email?: string;
    photo?: string;
}, z.ZodObjectDef<{
    name: z.ZodOptional<z.ZodString>;
    surname: z.ZodOptional<z.ZodString>;
    photo: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny>, {
    name?: string;
    surname?: string;
    email?: string;
    photo?: string;
}>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
