import { TCreateGenre } from "@/schema/genre";
import { useMutation } from "@tanstack/react-query";
import { createAuthor, createGenre, createQuote, updateQuote } from "../api";
import { TCreateAuthor } from "@/schema/author";
import { TCreateQuote, TUpdateQuote } from "@/schema/quotes";

export const useCreateGenreMutation = () => {
  return useMutation({
    mutationFn: (genre: TCreateGenre) => {
      return createGenre(genre);
    },
    mutationKey: ["create-genre"],
  });
};

export const useCreateAuthorMutation = () => {
  return useMutation({
    mutationFn: (author: TCreateAuthor) => {
      return createAuthor(author);
    },
    mutationKey: ["create-author"],
  });
};

export const useCreateQuoteMutation = () => {
  return useMutation({
    mutationFn: (quote: TCreateQuote) => {
      return createQuote(quote);
    },
    mutationKey: ["create-quote"],
  });
};

export const useUpdateQuoteMutation = () => {
  return useMutation({
    mutationFn: (quote: TUpdateQuote) => {
      return updateQuote(quote);
    },
    mutationKey: ["update-quote"],
  });
};
