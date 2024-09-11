import { TGetAuthors } from "@/schema/author";
import { TDataWithPagination, TQueryWithPagination } from "@/types/types";
import { generateSearchParams } from "./utils";
import { TAuthor } from "@/dtos/authors";
import { TGetGenres } from "@/schema/genre";
import { TGenre } from "@/dtos/geners";

export const getAuthors = async (params: TGetAuthors) => {
  const searchParams = generateSearchParams(params);
  const data = await fetch(`/api/authors?${searchParams.toString()}`);
  const response = await data.json();

  console.log(response?.data);

  return response?.data as TDataWithPagination<TAuthor[]>;
};

export const getGenres = async (params: TGetGenres) => {
  const searchParams = generateSearchParams(params);
  const data = await fetch(`/api/genres?${searchParams.toString()}`);
  const response = await data.json();

  return response?.data as TDataWithPagination<TGenre[]>;
};
