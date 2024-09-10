import { GenreSchema } from "prisma/generated/zod";
import { z } from "zod";

const getGenresSchema = z.object({
  title: GenreSchema.shape.title.optional(),
});

const createGenreSchema = GenreSchema.pick({
  title: true,
});

export type TGetGenres = z.infer<typeof getGenresSchema>;
export type TCreateGenre = z.infer<typeof createGenreSchema>;
