import { Author } from "@prisma/client";

// TODO : Design DTO

export const authorsDtoMapper = (author: Author) => {
  return { ...author };
};

export type TAuthor = ReturnType<typeof authorsDtoMapper>;
