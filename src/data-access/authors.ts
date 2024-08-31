import { authorsDtoMapper } from "@/dtos/authors";
import prisma from "@/lib/prisma";
import { TCreateAuthor, TGetAuthors } from "@/schema/author";

export const getAuthors = async ({ name }: TGetAuthors) => {
  const authors = await prisma.author.findMany({
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

  return authors.map(authorsDtoMapper);
};

export const createAuthor = async ({ name, avatar }: TCreateAuthor) => {
  const author = await prisma.author.create({
    data: {
      name,
      avatar,
    },
  });

  return authorsDtoMapper(author);
};
