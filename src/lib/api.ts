import { TGetAuthors } from "@/schema/author";
import { TDataWithPagination } from "@/types/types";
import { generateSearchParams } from "./utils";
import { TAuthor } from "@/dto/authors";
import { TGetGenres } from "@/schema/genre";
import { TGenre } from "@/dto/genres";
import { TGetPosts } from "@/schema/posts";
import { TPost } from "@/dto/posts";

// Authors
export const getAuthors = async (params: TGetAuthors) => {
  const searchParams = generateSearchParams(params);
  const data = await fetch(`/api/authors?${searchParams.toString()}`);
  const response = await data.json();

  console.log(response?.data);

  return response?.data as TDataWithPagination<TAuthor[]>;
};

// Genres
export const getGenres = async (params: TGetGenres) => {
  const searchParams = generateSearchParams(params);
  const data = await fetch(`/api/genres?${searchParams.toString()}`);
  const response = await data.json();

  return response?.data as TDataWithPagination<TGenre[]>;
};

// Posts
export const getPosts = async (params: TGetPosts) => {
  const searchParams = generateSearchParams(params);
  const data = await fetch(`/api/posts?${searchParams.toString()}`);
  const response = await data.json();

  return response?.data as TDataWithPagination<TPost[]>;
};

// Quotes
