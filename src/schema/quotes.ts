import { z } from "zod";
import { idSchema } from "./schema";

export const createQuoteSchema = z.object({
  author: z.number(),
  post: z.number(),
  quote: z.string(),
  color: z.string(),
});

export const updateQuoteSchema = createQuoteSchema.extend({
  id: idSchema,
});

export type TCreateQuote = z.infer<typeof createQuoteSchema>;
export type TUpdateQuote = z.infer<typeof updateQuoteSchema>;
