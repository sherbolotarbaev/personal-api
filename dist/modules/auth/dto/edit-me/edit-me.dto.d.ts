import * as z from 'nestjs-zod/z';
declare const EditMeDto_base: import("nestjs-zod").ZodDto<{
    name?: string;
    surname?: string;
    photo?: string;
}, z.ZodObjectDef<{
    name: z.ZodOptional<z.ZodString>;
    surname: z.ZodOptional<z.ZodString>;
    photo: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny>, {
    name?: string;
    surname?: string;
    photo?: string;
}>;
export declare class EditMeDto extends EditMeDto_base {
}
export {};
