import { AuthorSchema } from "../../prisma/generated/zod";
import { z } from "zod";
import { ImageSchema } from "./schema";

export const getAuthorsSchema = z.object({
  name: AuthorSchema.shape.name.optional(),
});

export const createAuthorSchema = z.object({
  name: AuthorSchema.shape.name,
  avatar: ImageSchema,
});

export type TGetAuthors = z.infer<typeof getAuthorsSchema>;
export type TCreateAuthor = z.infer<typeof createAuthorSchema>;
