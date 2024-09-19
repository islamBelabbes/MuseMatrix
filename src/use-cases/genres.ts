import {
  countGenres,
  createGenre,
  getGenreById,
  getGenres,
} from "@/data-access/geners";
import { AppError, AuthError } from "@/lib/error";
import { TCreateGenre, TGetGenres } from "@/schema/genre";
import { TQueryWithPagination } from "@/types/types";
import generatePagination from "@/lib/generate-pagination";
import { revalidatePath } from "next/cache";
import { isAdminUseCase } from "@/use-cases/auth";
import { TUser } from "@/dto/users";

export const getGenresUseCase = async ({
  limit,
  page,
  title,
}: TQueryWithPagination<TGetGenres> = {}) => {
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

export const createGenreUseCase = async ({
  user,
  ...data
}: TCreateGenre & { user: TUser }) => {
  if (!isAdminUseCase(user)) throw new AuthError();

  const genre = await createGenre(data);

  // TODO : use dependency injection for Nextjs specific Apis
  revalidatePath("/");
  return genre;
};
