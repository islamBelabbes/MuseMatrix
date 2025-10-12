import { Author, Genre, Post } from "@prisma/client";

// TODO : Design DTO

type PostWithRelations = Post & {
  genre: Genre;
  author: Author;
};

export const postsDtoMapper = (post: PostWithRelations) => {
  return { ...post };
};

export type TPost = ReturnType<typeof postsDtoMapper>;
