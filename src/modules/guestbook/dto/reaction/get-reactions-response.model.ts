import * as z from 'nestjs-zod/z';

const GetReactionsResponseSchema = z.array(
  z.object({
    messageId: z.number(),
    reactions: z.record(z.array(z.string())),
  }),
);

export type GetReactionsResponseModel = z.infer<
  typeof GetReactionsResponseSchema
>;
