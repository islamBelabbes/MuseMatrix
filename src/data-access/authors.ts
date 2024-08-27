import prisma from "@/lib/prisma";
import { TCreateAuthor, TGetAuthors } from "@/schema/author";

export const getAuthors = async ({ name }: TGetAuthors) => {
  return prisma.author.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    take: 8,
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const createAuthor = async ({ name, avatar }: TCreateAuthor) => {
  return prisma.author.create({
    data: {
      name,
      avatar,
    },
  });
};
