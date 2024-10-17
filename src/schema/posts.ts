import { z } from "zod";
import { PostSchema } from "../../prisma/generated/zod";
import { IdSchema, ImageSchema } from "./schema";

export const getPostsSchema = z.object({
  status: PostSchema.shape.status.optional(),
  title: PostSchema.shape.title.optional(),
  genreId: IdSchema.optional(),
});

export const getPostByIdSchema = z.object({
  id: IdSchema,
  status: getPostsSchema.shape.status,
});

export const createPostSchema = PostSchema.pick({
  title: true,
  content: true,
  status: true,
}).extend({
  cover: ImageSchema,
  genreId: IdSchema,
  authorId: IdSchema,
});

export const updatePostSchema = createPostSchema.partial().extend({
  id: IdSchema,
});

export type TGetPosts = z.infer<typeof getPostsSchema>;
export type TGetPostById = z.infer<typeof getPostByIdSchema>;
export type TCreatePost = z.infer<typeof createPostSchema>;
export type TUpdatePost = z.infer<typeof updatePostSchema>;
