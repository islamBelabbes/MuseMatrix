import { Author, Post, Quote } from "@prisma/client";

// TODO : Design DTO

type TQuoteWithRelations = Quote & {
  author: Author;
  post: Pick<Post, "id" | "title"> | null;
};

export const quotesDtoMapper = (quote: TQuoteWithRelations) => {
  return { ...quote };
};

export type TQuote = ReturnType<typeof quotesDtoMapper>;
