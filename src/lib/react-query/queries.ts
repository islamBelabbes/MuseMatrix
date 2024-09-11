import { useQuery } from "@tanstack/react-query";
import { getAuthors, getGenres, getPosts } from "@/lib/api";
import { TGetAuthors } from "@/schema/author";
import { TGetGenres } from "@/schema/genre";
import { TGetPosts } from "@/schema/posts";

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

export const usePostsQuery = (params: TGetPosts) => {
  return useQuery({
    queryKey: ["posts", params.title, params.status, params.genreId],
    queryFn: () => getPosts(params),
  });
};
