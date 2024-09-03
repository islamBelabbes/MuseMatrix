import { quotesDtoMapper } from "@/dtos/quotes";
import prisma from "@/lib/prisma";
import { TCreateQuote, TUpdateQuote } from "@/schema/quotes";
import { TPaginationQuery } from "@/types/types";

export const getQuotes = async ({ limit, page }: TPaginationQuery) => {
  const skip = page && limit && (page - 1) * limit;
  const quotes = await prisma.quote.findMany({
    take: limit,
    skip,
    orderBy: {
      createdAt: "desc",
    },
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

export const createQuote = async ({
  quote,
  color,
  postId,
  authorId,
}: TCreateQuote) => {
  const data = await prisma.quote.create({
    data: {
      authorId,
      postId,
      quote,
      color,
    },
    include: {
      author: true,
      post: true,
    },
  });

  return quotesDtoMapper(data);
};

export const updateQuote = async ({
  id,
  color,
  quote,
  authorId,
  postId,
}: TUpdateQuote) => {
  const data = await prisma.quote.update({
    where: {
      id,
    },
    data: {
      authorId,
      color,
      postId,
      quote,
    },
    include: {
      author: true,
      post: true,
    },
  });

  return quotesDtoMapper(data);
};

export const DeleteQuote = async (id: number) => {
  return prisma.quote.delete({
    where: {
      id,
    },
  });
};
