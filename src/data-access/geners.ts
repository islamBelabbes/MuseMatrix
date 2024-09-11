import { genresDtoMapper } from "@/dtos/geners";
import prisma from "@/lib/prisma";
import { TCreateGenre, TGetGenres } from "@/schema/genre";
import { TQueryWithPagination } from "@/types/types";

export const getGenres = async ({
  title,
  limit,
  page,
}: TQueryWithPagination<TGetGenres>) => {
  const skip = limit === -1 ? undefined : (page - 1) * limit;
  const take = limit === -1 ? undefined : limit;

  const genres = await prisma.genre.findMany({
    where: {
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
    take,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  return genres.map(genresDtoMapper);
};

export const getGenreById = async (id: number) => {
  const genre = await prisma.genre.findUnique({
    where: {
      id,
    },
  });

  if (!genre) return null;
  return genresDtoMapper(genre);
};

export const countGenres = async (where?: TGetGenres) => {
  return prisma.genre.count({ where: { title: { contains: where?.title } } });
};

export const createGenre = async ({ title }: TCreateGenre) => {
  const genre = await prisma.genre.create({
    data: {
      title,
    },
  });

  return genresDtoMapper(genre);
};
