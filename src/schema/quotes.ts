import { QuoteSchema } from "prisma/generated/zod";
import { z } from "zod";

export const createQuoteSchema = QuoteSchema.pick({
  authorId: true,
  postId: true,
  quote: true,
  color: true,
}).extend({
  postId: QuoteSchema.shape.postId.optional(),
});

export const updateQuoteSchema = createQuoteSchema.extend({
  id: z.number().int(),
});

export type TCreateQuote = z.infer<typeof createQuoteSchema>;
export type TUpdateQuote = z.infer<typeof updateQuoteSchema>;
