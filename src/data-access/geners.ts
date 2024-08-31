import { genresDtoMapper } from "@/dtos/geners";
import prisma from "@/lib/prisma";
import { TCreateGenre, TGetGenres } from "@/schema/genre";
import { TPaginationQuery } from "@/types/types";

export const getGenres = async ({
  title,
  limit,
  page,
}: TGetGenres & TPaginationQuery = {}) => {
  const skip = page && limit && (page - 1) * limit;
  const genres = await prisma.genre.findMany({
    where: {
      title: {
        contains: title,
      },
    },
    take: limit,
    skip,
    orderBy: {
      updatedAt: "desc",
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

export const countGenres = async ({ title }: TGetGenres = {}) => {
  return prisma.genre.count({ where: { title: { contains: title } } });
};

export const createGenre = async ({ title }: TCreateGenre) => {
  const genre = await prisma.genre.create({
    data: {
      title,
    },
  });

  return genresDtoMapper(genre);
};
