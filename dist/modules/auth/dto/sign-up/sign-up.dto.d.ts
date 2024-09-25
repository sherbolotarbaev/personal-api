import * as z from 'nestjs-zod/z';
declare const SignUpDto_base: import("nestjs-zod").ZodDto<{
    name?: string;
    surname?: string;
    email?: string;
}, z.ZodObjectDef<{
    name: z.ZodString;
    surname: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    name?: string;
    surname?: string;
    email?: string;
}>;
export declare class SignUpDto extends SignUpDto_base {
}
export {};
