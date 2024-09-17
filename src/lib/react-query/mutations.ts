import { TCreateGenre } from "@/schema/genre";
import { useMutation } from "@tanstack/react-query";
import {
  createAuthor,
  createGenre,
  createPost,
  createQuote,
  deleteEntry,
  updatePost,
  updateQuote,
} from "../api";
import { TCreateAuthor } from "@/schema/author";
import { TCreateQuote, TUpdateQuote } from "@/schema/quotes";
import { TCreatePost, TUpdatePost } from "@/schema/posts";

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

export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: (post: TCreatePost) => {
      return createPost(post);
    },
    mutationKey: ["create-post"],
  });
};

export const useUpdatePostMutation = () => {
  return useMutation({
    mutationFn: (post: TUpdatePost) => {
      return updatePost(post);
    },
    mutationKey: ["update-post"],
  });
};

export const useDeleteEntryMutation = () => {
  return useMutation({
    mutationFn: (route: string) => {
      return deleteEntry(route);
    },
    mutationKey: ["delete-entry"],
  });
};
