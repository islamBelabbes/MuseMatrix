import { authorsDtoMapper } from "@/dtos/authors";
import prisma from "@/lib/prisma";
import { TCreateAuthor, TGetAuthors } from "@/schema/author";
import { Author } from "@prisma/client";

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

export const getAuthorById = async (id: number) => {
  const author = await prisma.author.findUnique({
    where: {
      id,
    },
  });

  if (!author) return null;
  return authorsDtoMapper(author);
};

export const createAuthor = async (
  data: Omit<TCreateAuthor, "avatar"> & { avatar: Author["avatar"] },
) => {
  const author = await prisma.author.create({ data });
  return authorsDtoMapper(author);
};
