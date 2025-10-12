import { Genre } from "@prisma/client";

// TODO : Design DTO

export const genresDtoMapper = (genre: Genre) => {
  return { ...genre };
};

export type TGenre = ReturnType<typeof genresDtoMapper>;
