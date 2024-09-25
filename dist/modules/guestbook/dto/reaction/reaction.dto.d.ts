import * as z from 'nestjs-zod/z';
declare const ReactionDto_base: import("nestjs-zod").ZodDto<{
    emoji?: string;
}, z.ZodObjectDef<{
    emoji: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    emoji?: string;
}>;
export declare class ReactionDto extends ReactionDto_base {
}
export {};
