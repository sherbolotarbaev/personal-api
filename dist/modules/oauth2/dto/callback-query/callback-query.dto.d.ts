import * as z from 'nestjs-zod/z';
declare const CallbackQueryDto_base: import("nestjs-zod").ZodDto<{
    code?: string;
    state?: string;
}, z.ZodObjectDef<{
    code: z.ZodString;
    state: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    code?: string;
    state?: string;
}>;
export declare class CallbackQueryDto extends CallbackQueryDto_base {
}
export {};
