import {
  countAuthors,
  createAuthor,
  getAuthorById,
  getAuthors,
} from "@/data-access/authors";
import { AppError } from "@/lib/error";
import { type TCreateAuthor, type TGetAuthors } from "@/schema/author";
import { TPaginationQuery } from "@/types/types";

export const getAuthorsUseCase = async ({
  limit = 5,
  page = 1,
  name,
}: TGetAuthors & TPaginationQuery = {}) => {
  const countPromise = countAuthors({ name });
  const authorsPromise = getAuthors({ limit, page, name });

  const [count, authors] = await Promise.all([countPromise, authorsPromise]);
  const totalPages = Math.ceil(count / limit);

  return {
    data: authors,
    count,
    totalPages,
    hasNext: page < totalPages,
  };
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
