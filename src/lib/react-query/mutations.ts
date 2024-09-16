import { TCreateGenre } from "@/schema/genre";
import { useMutation } from "@tanstack/react-query";
import { createAuthor, createGenre } from "../api";
import { TCreateAuthor } from "@/schema/author";

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
