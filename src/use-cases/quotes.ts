import {
  DeleteQuote,
  countQuotes,
  createQuote,
  getQuoteById,
  getQuotes,
  updateQuote,
} from "@/data-access/quotes";
import { TCreateQuote, TUpdateQuote } from "@/schema/quotes";
import { TPaginationQuery } from "@/types/types";
import { revalidateTag } from "next/cache";

export const getQuotesUseCase = async ({
  page = 1,
  limit = 5,
}: TPaginationQuery = {}) => {
  const [count, data] = await Promise.all([
    countQuotes(),
    getQuotes({ page, limit }),
  ]);

  const totalPages = Math.ceil(count / limit);
  return {
    data,
    count,
    totalPages,
    hasNext: page < totalPages,
  };
};

export const getQuoteByIdUseCase = async (id: number) => {
  const quote = await getQuoteById(id);
  if (!quote) throw new Error("quote not found");

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
