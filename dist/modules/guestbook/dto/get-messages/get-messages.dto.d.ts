import * as z from 'nestjs-zod/z';
declare const GetMessagesDto_base: import("nestjs-zod").ZodDto<{
    take?: number;
}, z.ZodObjectDef<{
    take: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny>, {
    take?: number;
}>;
export declare class GetMessagesDto extends GetMessagesDto_base {
}
export {};
