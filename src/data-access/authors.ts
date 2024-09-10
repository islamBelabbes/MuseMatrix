import { authorsDtoMapper } from "@/dtos/authors";
import prisma from "@/lib/prisma";
import { TCreateAuthor, TGetAuthors } from "@/schema/author";
import { TPaginationQuery } from "@/types/types";
import { Author } from "@prisma/client";

export const getAuthors = async ({
  name,
  limit,
  page,
}: TGetAuthors & TPaginationQuery = {}) => {
  const skip = page && limit && (page - 1) * limit;
  const authors = await prisma.author.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    take: limit,
    skip,
    orderBy: {
      createdAt: "desc",
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

export const countAuthors = async (where?: TGetAuthors) => {
  return prisma.author.count({
    where: {
      name: {
        contains: where?.name,
        mode: "insensitive",
      },
    },
  });
};

export const createAuthor = async (
  data: Omit<TCreateAuthor, "avatar"> & { avatar: Author["avatar"] },
) => {
  const author = await prisma.author.create({ data });
  return authorsDtoMapper(author);
};
