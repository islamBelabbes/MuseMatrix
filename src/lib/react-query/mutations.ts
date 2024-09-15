import { TCreateGenre } from "@/schema/genre";
import { useMutation } from "@tanstack/react-query";
import { createGenre } from "../api";

export const useCreateGenreMutation = () => {
  return useMutation({
    mutationFn: (genre: TCreateGenre) => {
      return createGenre(genre);
    },
  });
};
