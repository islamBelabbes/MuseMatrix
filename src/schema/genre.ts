import { z } from "zod";

const getGenresSchema = z.object({
  title: z.string().optional(),
});

const createGenreSchema = z.object({
  title: z.string(),
});

export type TGetGenres = z.infer<typeof getGenresSchema>;
export type TCreateGenre = z.infer<typeof createGenreSchema>;
