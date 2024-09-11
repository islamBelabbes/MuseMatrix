import {
  countGenres,
  createGenre,
  getGenreById,
  getGenres,
} from "@/data-access/geners";
import { AppError } from "@/lib/error";
import { TCreateGenre, TGetGenres } from "@/schema/genre";
import { TQueryWithPagination } from "@/types/types";
import generatePagination from "@/lib/generate-pagination";

export const getGenresUseCase = async ({
  limit = 5,
  page = 1,
  title,
}: TQueryWithPagination<TGetGenres>) => {
  const countPromise = countGenres({ title });
  const genresPromise = getGenres({ limit, page, title });

  const [total, genres] = await Promise.all([countPromise, genresPromise]);

  return {
    data: genres,
    ...generatePagination({ total, page, limit }),
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
