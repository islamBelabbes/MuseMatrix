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

export const getQuote = async ({ id }: { id: number }) => {
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
  author,
  post,
  quote,
  color,
}: TCreateQuote) => {
  return prisma.quote.create({
    data: {
      authorId: author,
      postId: post,
      quote,
      color,
    },
  });
};

export const updateQuote = async ({
  id,
  author,
  color,
  post,
  quote,
}: TUpdateQuote) => {
  return prisma.quote.update({
    where: {
      id,
    },
    data: {
      authorId: author,
      color,
      postId: post,
      quote,
    },
  });
};

export const DeleteQuote = async ({ id }: { id: number }) => {
  return prisma.quote.delete({
    where: {
      id,
    },
  });
};
