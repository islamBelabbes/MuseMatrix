import { QuoteSchema } from "../../prisma/generated/zod";
import { z } from "zod";
import { IdSchema } from "./schema";

const COLOR_REGEX =
  /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/gi;

export const createQuoteSchema = z.object({
  quote: QuoteSchema.shape.quote.min(1),
  postId: IdSchema.optional().nullable(),
  authorId: IdSchema,
  color: QuoteSchema.shape.color.regex(COLOR_REGEX, {
    message: "the color you entered is not valid",
  }),
});

export const updateQuoteSchema = createQuoteSchema.partial().extend({
  id: IdSchema,
});

export type TCreateQuote = z.infer<typeof createQuoteSchema>;
export type TUpdateQuote = z.infer<typeof updateQuoteSchema>;
