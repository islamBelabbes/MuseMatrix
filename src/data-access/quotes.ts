import { quotesDtoMapper } from "@/dtos/quotes";
import prisma from "@/lib/prisma";
import { TCreateQuote, TUpdateQuote } from "@/schema/quotes";
import { TPaginationQuery } from "@/types/types";

export const getQuotes = async ({ limit, page }: TPaginationQuery) => {
  const skip = limit === -1 ? undefined : (page - 1) * limit;
  const take = limit === -1 ? undefined : limit;

  const quotes = await prisma.quote.findMany({
    where: {
      OR: [
        { postId: null },
        {
          post: {
            status: "Published",
          },
        },
      ],
    },
    include: {
      author: true,
      post: true,
    },
    take,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  return quotes.map(quotesDtoMapper);
};

export const getQuoteById = async (id: number) => {
  const quote = await prisma.quote.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      post: true,
    },
  });

  if (!quote) return null;
  return quotesDtoMapper(quote);
};

export const countQuotes = async () => {
  return prisma.quote.count({
    where: {
      OR: [
        { postId: null },
        {
          post: {
            status: "Published",
          },
        },
      ],
    },
  });
};

export const createQuote = async (data: TCreateQuote) => {
  const quote = await prisma.quote.create({
    data,
    include: {
      author: true,
      post: true,
    },
  });

  return quotesDtoMapper(quote);
};

export const updateQuote = async ({ id, ...data }: TUpdateQuote) => {
  const quote = await prisma.quote.update({
    where: {
      id,
    },
    data,
    include: {
      author: true,
      post: true,
    },
  });

  return quotesDtoMapper(quote);
};

export const DeleteQuote = async (id: number) => {
  return prisma.quote.delete({
    where: {
      id,
    },
  });
};
