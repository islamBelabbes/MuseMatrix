import { z } from "zod";

export const getAuthorsSchema = z.object({
  name: z.string().optional(),
});

export const createAuthorSchema = z.object({
  name: z.string(),
  avatar: z.string(),
});

export type TGetAuthors = z.infer<typeof getAuthorsSchema>;
export type TCreateAuthor = z.infer<typeof createAuthorSchema>;
