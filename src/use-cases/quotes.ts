import {
  DeleteQuote,
  countQuotes,
  createQuote,
  getQuoteById,
  getQuotes,
  updateQuote,
} from "@/data-access/quotes";
import { AppError } from "@/lib/error";
import { TCreateQuote, TUpdateQuote } from "@/schema/quotes";
import { TPaginationQuery } from "@/types/types";
import { revalidatePath, revalidateTag } from "next/cache";
import generatePagination from "@/lib/generate-pagination";

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

export const createQuoteUseCase = async (data: TCreateQuote) => {
  const quote = await createQuote(data);

  // TODO : use dependency for Nextjs specific Apis
  revalidatePath("/");
  revalidatePath("/quotes");

  return createQuote(data);
};

export const updateQuoteUseCase = async (data: TUpdateQuote) => {
  const quote = await updateQuote(data);

  // TODO : use dependency for Nextjs specific Apis
  revalidatePath("/");
  revalidatePath("/quotes");

  return quote;
};

export const deleteQuoteUseCase = async (id: number) => {
  await getQuoteByIdUseCase(id);

  await DeleteQuote(id);

  // TODO : use dependency for Nextjs specific Apis
  revalidatePath("/");
  revalidatePath("/quotes");

  return true;
};
