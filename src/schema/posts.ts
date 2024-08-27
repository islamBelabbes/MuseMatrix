import { STATUS } from "@prisma/client";
import { z } from "zod";
import { idSchema } from "./schema";

export const getPostsSchema = z.object({
  title: z.string().optional(),
  status: z.nativeEnum(STATUS).optional().catch(undefined),
});

export const createPostSchema = z.object({
  genre: idSchema,
  author: idSchema,
  title: z.string(),
  cover: z.string(),
  content: z.string(),
});

export const updatePostSchema = createPostSchema.extend({
  id: idSchema,
});

export type TGetPosts = z.infer<typeof getPostsSchema>;
export type TCreatePost = z.infer<typeof createPostSchema>;
export type TUpdatePost = z.infer<typeof updatePostSchema>;
