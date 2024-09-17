import { QuoteSchema } from "prisma/generated/zod";
import { z } from "zod";
import { IdSchema } from "./schema";

export const createQuoteSchema = QuoteSchema.pick({
  color: true,
}).extend({
  quote: QuoteSchema.shape.quote.min(1),
  postId: IdSchema.optional().nullable(),
  authorId: IdSchema,
});

export const updateQuoteSchema = createQuoteSchema.partial().extend({
  id: IdSchema,
});

export type TCreateQuote = z.infer<typeof createQuoteSchema>;
export type TUpdateQuote = z.infer<typeof updateQuoteSchema>;
