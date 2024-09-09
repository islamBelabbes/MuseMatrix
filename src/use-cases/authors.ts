import { createAuthor, getAuthorById, getAuthors } from "@/data-access/authors";
import { AppError } from "@/lib/error";
import { type TCreateAuthor, type TGetAuthors } from "@/schema/author";

export const getAuthorsUseCase = (where?: TGetAuthors) => {
  return getAuthors(where);
};

export const getAuthorByIdUseCase = async (id: number) => {
  const author = await getAuthorById(id);
  if (!author) throw new AppError("author not found", 404);

  return author;
};

// export const createAuthorUseCase = (data: TCreateAuthor) => {
//   return createAuthor(data);
// };

// export const updateAuthorUseCase = () => {};
