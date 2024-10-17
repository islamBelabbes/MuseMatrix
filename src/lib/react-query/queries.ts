import {
  useInfiniteQuery,
  useQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { getAuthors, getGenres, getPosts, getQuotes } from "@/lib/api";
import { TGetAuthors } from "@/schema/author";
import { TGetGenres } from "@/schema/genre";
import { TGetPosts } from "@/schema/posts";
import { TQuote } from "@/dto/quotes";
import { TDataWithPagination } from "@/types/types";
import { TPost } from "@/dto/posts";

export const useAuthorsQuery = (params: TGetAuthors) => {
  return useQuery({
    queryKey: ["authors", params.name],
    queryFn: () => getAuthors(params),
    refetchOnWindowFocus: false,
    retry: 0,
  });
};

export const useGenresQuery = (params: TGetGenres) => {
  return useQuery({
    queryKey: ["genres", params.title],
    queryFn: () => getGenres(params),
    refetchOnWindowFocus: false,
    retry: 0,
  });
};

export const usePostsQuery = (params: TGetPosts) => {
  return useQuery({
    queryKey: ["posts", params.title, params.status, params.genreId],
    queryFn: () => getPosts(params),
    refetchOnWindowFocus: false,
    retry: 0,
  });
};

export const usePostsInfiniteQuery = (
  limit: number,
  enabled: boolean = true,
  genreId: number,
  initialData?: TDataWithPagination<TPost[]>,
) => {
  return useInfiniteQuery({
    queryKey: ["infinity_posts", genreId, enabled],
    queryFn: (param) => {
      return getPosts({ limit, page: param.pageParam, genreId });
    },
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (!lastPage.hasNext) return undefined;
      return lastPageParam + 1;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled,

    ...(initialData && {
      initialData: () => {
        return {
          pageParams: [1],
          pages: [initialData],
        };
      },
    }),
  });
};

export const useQuotesQuery = (
  limit: number,
  initialData?: TDataWithPagination<TQuote[]>,
) => {
  return useInfiniteQuery({
    queryKey: ["quotes"],
    queryFn: (param) => {
      return getQuotes({ limit, page: param.pageParam });
    },
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (!lastPage.hasNext) return undefined;
      return lastPageParam + 1;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,

    ...(initialData && {
      initialData: () => {
        return {
          pageParams: [1],
          pages: [initialData],
        };
      },
    }),
  });
};
