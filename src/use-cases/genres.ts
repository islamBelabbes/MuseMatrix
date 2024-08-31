import {
  countGenres,
  createGenre,
  getGenreById,
  getGenres,
} from "@/data-access/geners";
import { AppError } from "@/lib/error";
import { TCreateGenre, TGetGenres } from "@/schema/genre";
import { TPaginationQuery } from "@/types/types";

export const getGenresUseCase = async ({
  limit = 5,
  page = 1,
  title,
}: TGetGenres & TPaginationQuery = {}) => {
  const countPromise = countGenres({ title });
  const genresPromise = getGenres({ limit, page, title });

  const [count, genres] = await Promise.all([countPromise, genresPromise]);
  const totalPages = Math.ceil(count / limit);

  return {
    data: genres,
    count,
    totalPages,
    hasNext: page < totalPages,
  };
};

export const getGenreByIdUseCase = async (id: number) => {
  const genre = await getGenreById(id);
  if (!genre) throw new AppError("Genre not found", 404);

  return genre;
};

export const createGenreUseCase = (data: TCreateGenre) => {
  return createGenre(data);
};