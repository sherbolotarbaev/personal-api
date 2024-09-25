import * as z from 'nestjs-zod/z';
declare const MessageDto_base: import("nestjs-zod").ZodDto<{
    body?: string;
}, z.ZodObjectDef<{
    body: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    body?: string;
}>;
export declare class MessageDto extends MessageDto_base {
}
export {};
