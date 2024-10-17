import { Author } from "@prisma/client";

export const authorsDtoMapper = (author: Author) => {
  return { ...author };
};

export type TAuthor = ReturnType<typeof authorsDtoMapper>;
