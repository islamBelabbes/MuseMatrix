import { createGenre, getGenres } from "@/data-access/geners";
import { TCreateGenre, TGetGenres } from "@/schema/genre";

export const getGenresUseCase = (data: TGetGenres) => {
  return getGenres(data);
};

export const createGenreUseCase = (data: TCreateGenre) => {
  return createGenre(data);
};
