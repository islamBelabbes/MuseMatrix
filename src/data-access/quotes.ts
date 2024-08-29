import prisma from "@/lib/prisma";
import { TCreateQuote, TUpdateQuote } from "@/schema/quotes";
import { TPaginationQuery } from "@/types/types";

export const getQuotes = async ({ limit, page }: TPaginationQuery) => {
  const skip = page && limit && (page - 1) * limit;
  return prisma.quote.findMany({
    take: limit,
    skip,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      post: {
        select: {
          title: true,
          id: true,
        },
      },
    },
  });
};

export const getQuoteById = async (id: number) => {
  return prisma.quote.findUnique({
    where: {
      id,
    },
  });
};

export const countQuotes = async () => {
  return prisma.quote.count();
};

export const createQuote = async ({
  quote,
  color,
  postId,
  authorId,
}: TCreateQuote) => {
  return prisma.quote.create({
    data: {
      authorId,
      postId,
      quote,
      color,
    },
  });
};

export const updateQuote = async ({
  id,
  color,
  quote,
  authorId,
  postId,
}: TUpdateQuote) => {
  return prisma.quote.update({
    where: {
      id,
    },
    data: {
      authorId,
      color,
      postId,
      quote,
    },
  });
};

export const DeleteQuote = async (id: number) => {
  return prisma.quote.delete({
    where: {
      id,
    },
  });
};
