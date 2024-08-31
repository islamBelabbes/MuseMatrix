import { z } from "zod";
import { PostSchema } from "prisma/generated/zod";

export const getPostsSchema = PostSchema.pick({
  title: true,
  status: true,
  genreId: true,
}).extend({
  status: PostSchema.shape.status.optional().catch("Draft"),
  title: PostSchema.shape.title.optional(),
  genreId: PostSchema.shape.genreId.optional(),
});

export const getPostByIdSchema = PostSchema.pick({
  id: true,
}).extend({
  status: getPostsSchema.shape.status,
});

export const createPostSchema = PostSchema.pick({
  title: true,
  cover: true,
  content: true,
  genreId: true,
  authorId: true,
});

export const updatePostSchema = createPostSchema.extend({
  id: z.number().int(),
});

export type TGetPosts = z.infer<typeof getPostsSchema>;
export type TGetPostById = z.infer<typeof getPostByIdSchema>;
export type TCreatePost = z.infer<typeof createPostSchema>;
export type TUpdatePost = z.infer<typeof updatePostSchema>;
