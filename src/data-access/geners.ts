import prisma from "@/lib/prisma";
import { TCreateGenre, TGetGenres } from "@/schema/genre";

export const createGenre = async ({ title }: TCreateGenre) => {
  return prisma.genre.create({
    data: {
      title,
    },
  });
};

export const getGenres = async ({ title }: TGetGenres) => {
  return prisma.genre.findMany({
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
};
