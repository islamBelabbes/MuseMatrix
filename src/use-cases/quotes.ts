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
import { revalidateTag } from "next/cache";
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
  if (!quote) throw new AppError("quote not found");

  return quote;
};

export const createQuoteUseCase = (data: TCreateQuote) => {
  return createQuote(data);
};

export const updateQuoteUseCase = (data: TUpdateQuote) => {
  return updateQuote(data);
};

export const deleteQuoteUseCase = async (id: number) => {
  await DeleteQuote(id);
  revalidateTag("quotes");
  return true;
};
