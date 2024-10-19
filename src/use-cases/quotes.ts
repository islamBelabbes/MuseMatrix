import {
  DeleteQuote,
  countQuotes,
  createQuote,
  getQuoteById,
  getQuotes,
  updateQuote,
} from "@/data-access/quotes";
import { AppError, AuthError } from "@/lib/error";
import { TCreateQuote, TUpdateQuote } from "@/schema/quotes";
import { TPaginationQuery } from "@/types/types";
import { revalidatePath } from "next/cache";
import generatePagination from "@/lib/generate-pagination";
import { TUser } from "@/dto/users";
import { isAdminUseCase } from "@/use-cases/authorization";
import { getAuthorByIdUseCase } from "./authors";

export const getQuotesUseCase = async ({
  page = 1,
  limit = 5,
}: TPaginationQuery = {}) => {
  const [total, data] = await Promise.all([
    countQuotes(),
    getQuotes({ page, limit }),
  ]);

  return {
    data,
    ...generatePagination({ total, page, limit }),
  };
};

export const getQuoteByIdUseCase = async (id: number) => {
  const quote = await getQuoteById(id);
  if (!quote) throw new AppError("quote not found", 404);

  return quote;
};

export const createQuoteUseCase = async ({
  user,
  ...data
}: TCreateQuote & { user: TUser }) => {
  if (!isAdminUseCase(user)) throw new AuthError();

  await getAuthorByIdUseCase(data.authorId);

  const quote = await createQuote(data);

  // TODO : use dependency injection for Nextjs specific Apis
  revalidatePath("/");
  revalidatePath("/quotes");

  return quote;
};

export const updateQuoteUseCase = async ({
  user,
  ...data
}: TUpdateQuote & { user: TUser }) => {
  if (!isAdminUseCase(user)) throw new AuthError();

  await Promise.all([
    getQuoteByIdUseCase(data.id),
    data.authorId && getAuthorByIdUseCase(data.authorId),
  ]);

  const quote = await updateQuote(data);

  // TODO : use dependency injection for Nextjs specific Apis
  revalidatePath("/");
  revalidatePath("/quotes");

  return quote;
};

export const deleteQuoteUseCase = async (id: number, user: TUser) => {
  if (!isAdminUseCase(user)) throw new AuthError();

  await getQuoteByIdUseCase(id);

  await DeleteQuote(id);

  // TODO : use dependency injection for Nextjs specific Apis
  revalidatePath("/");
  revalidatePath("/quotes");

  return true;
};
