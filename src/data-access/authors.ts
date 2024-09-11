import { authorsDtoMapper } from "@/dtos/authors";
import { PAGINATION } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { TCreateAuthor, TGetAuthors } from "@/schema/author";
import { TQueryWithPagination } from "@/types/types";
import { Author } from "@prisma/client";

export const getAuthors = async ({
  name,
  limit = PAGINATION.LIMIT,
  page = PAGINATION.PAGE,
}: TQueryWithPagination<TGetAuthors>) => {
  const skip = limit === -1 ? undefined : (page - 1) * limit;
  const take = limit === -1 ? undefined : limit;

  const authors = await prisma.author.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    take,
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
