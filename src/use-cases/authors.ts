import { createAuthor, getAuthors } from "@/data-access/authors";
import { type TCreateAuthor, type TGetAuthors } from "@/schema/author";

export const getAuthorsUseCase = ({ name }: TGetAuthors) => {
  return getAuthors({ name });
};

export const createAuthorUseCase = (data: TCreateAuthor) => {
  return createAuthor(data);
};

// export const updateAuthorUseCase = () => {};
