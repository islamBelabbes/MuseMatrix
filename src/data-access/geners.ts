import { genresDtoMapper } from "@/dtos/geners";
import prisma from "@/lib/prisma";
import { TCreateGenre, TGetGenres } from "@/schema/genre";

export const getGenres = async ({ title }: TGetGenres) => {
  const genres = await prisma.genre.findMany({
    where: {
      title: {
        contains: title,
      },
    },
    take: 8,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return genres.map(genresDtoMapper);
};

export const createGenre = async ({ title }: TCreateGenre) => {
  const genre = await prisma.genre.create({
    data: {
      title,
    },
  });

  return genresDtoMapper(genre);
};
