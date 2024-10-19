import { z } from "zod";
import { PostSchema } from "../../prisma/generated/zod";
import { IdSchema, ImageSchema } from "./schema";

const TitleSchema = PostSchema.shape.title.min(1);

export const getPostsSchema = z.object({
  status: PostSchema.shape.status.optional(),
  title: TitleSchema.optional(),
  genreId: IdSchema.optional(),
});

export const getPostByIdSchema = z.object({
  id: IdSchema,
  status: getPostsSchema.shape.status,
});

export const createPostSchema = PostSchema.pick({
  content: true,
  status: true,
}).extend({
  title: TitleSchema,
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
