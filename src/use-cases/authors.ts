import {
  countAuthors,
  createAuthor,
  getAuthorById,
  getAuthors,
} from "@/data-access/authors";
import { AppError } from "@/lib/error";
import { safeAsync } from "@/lib/safe";
import { utapi } from "@/lib/upload-thing";
import { type TCreateAuthor, type TGetAuthors } from "@/schema/author";
import { TQueryWithPagination } from "@/types/types";

export const getAuthorsUseCase = async ({
  limit,
  page,
  name,
}: TQueryWithPagination<TGetAuthors>) => {
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

export const createAuthorUseCase = async (data: TCreateAuthor) => {
  const file = await utapi.uploadFiles(data.avatar);
  if (file.error) throw new AppError("avatar upload failed", 500);

  const author = await safeAsync(
    createAuthor({ ...data, avatar: file.data.key }),
  );

  if (!author.success) {
    await utapi.deleteFiles(file.data.key);
    throw author.error;
  }

  return author.data;
};

// export const updateAuthorUseCase = () => {};
