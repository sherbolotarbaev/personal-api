import * as z from 'nestjs-zod/z';
declare const SignInDto_base: import("nestjs-zod").ZodDto<{
    email?: string;
    otp?: string;
}, z.ZodObjectDef<{
    email: z.ZodString;
    otp: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    email?: string;
    otp?: string;
}>;
export declare class SignInDto extends SignInDto_base {
}
export {};
