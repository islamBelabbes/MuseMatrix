import { useQuery } from "@tanstack/react-query";
import { getAuthors, getGenres } from "@/lib/api";
import { TGetAuthors } from "@/schema/author";
import { TGetGenres } from "@/schema/genre";

export const useAuthorsQuery = (params: TGetAuthors) => {
  return useQuery({
    queryKey: ["authors", params.name],
    queryFn: () => getAuthors(params),
  });
};

export const useGenresQuery = (params: TGetGenres) => {
  return useQuery({
    queryKey: ["genres", params.title],
    queryFn: () => getGenres(params),
  });
};
