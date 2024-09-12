import { GenreSchema } from "prisma/generated/zod";
import { z } from "zod";

export const getGenresSchema = z.object({
  title: GenreSchema.shape.title.optional(),
});

export const createGenreSchema = z.object({
  title: GenreSchema.shape.title.min(1),
});

export type TGetGenres = z.infer<typeof getGenresSchema>;
export type TCreateGenre = z.infer<typeof createGenreSchema>;
