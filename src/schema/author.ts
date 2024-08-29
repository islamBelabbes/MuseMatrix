import { AuthorSchema } from "prisma/generated/zod";
import { z } from "zod";

export const getAuthorsSchema = AuthorSchema.pick({
  name: true,
}).extend({
  name: AuthorSchema.shape.name.optional(),
});

export const createAuthorSchema = AuthorSchema.pick({
  name: true,
  avatar: true,
});

export type TGetAuthors = z.infer<typeof getAuthorsSchema>;
export type TCreateAuthor = z.infer<typeof createAuthorSchema>;
