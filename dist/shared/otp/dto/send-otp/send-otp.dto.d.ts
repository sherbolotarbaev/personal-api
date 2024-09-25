import * as z from 'nestjs-zod/z';
declare const SendOtpDto_base: import("nestjs-zod").ZodDto<{
    email?: string;
}, z.ZodObjectDef<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    email?: string;
}>;
export declare class SendOtpDto extends SendOtpDto_base {
}
export {};
