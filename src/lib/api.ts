import { TCreateAuthor, TGetAuthors } from "@/schema/author";
import { TDataWithPagination } from "@/types/types";
import { generateSearchParams } from "./utils";
import { TAuthor } from "@/dto/authors";
import { TCreateGenre, TGetGenres } from "@/schema/genre";
import { TGenre } from "@/dto/genres";
import { TGetPosts } from "@/schema/posts";
import { TPost } from "@/dto/posts";
import { AppError } from "./error";
import { TCreateQuote, TUpdateQuote } from "@/schema/quotes";
import { TQuote } from "@/dto/quotes";

// Authors
export const getAuthors = async (params: TGetAuthors) => {
  const searchParams = generateSearchParams(params);
  const response = await fetch(`/api/authors?${searchParams.toString()}`);

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }
  const data = await response.json();
  return data?.data as TDataWithPagination<TAuthor[]>;
};

export const createAuthor = async (author: TCreateAuthor) => {
  const formData = new FormData();
  formData.append("avatar", author.avatar);
  formData.append("name", author.name);

  const response = await fetch("/api/authors", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const data = await response.json();
  return data.data as TAuthor;
};

// Genres
export const getGenres = async (params: TGetGenres) => {
  const searchParams = generateSearchParams(params);
  const response = await fetch(`/api/genres?${searchParams.toString()}`);
  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }
  const data = await response.json();
  return data?.data as TDataWithPagination<TGenre[]>;
};

export const createGenre = async (genre: TCreateGenre) => {
  const response = await fetch("/api/genres", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(genre),
  });

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }
  const data = await response.json();
  return data.data as TGenre;
};

// Posts
export const getPosts = async (params: TGetPosts) => {
  const searchParams = generateSearchParams(params);
  const response = await fetch(`/api/posts?${searchParams.toString()}`);
  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const data = await response.json();
  return data?.data as TDataWithPagination<TPost[]>;
};

// Quotes

export const createQuote = async (quote: TCreateQuote) => {
  const response = await fetch("/api/quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quote),
  });

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }
  const data = await response.json();
  return data.data as { id: number };
};

export const updateQuote = async (quote: TUpdateQuote) => {
  const response = await fetch("/api/quotes/" + quote.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quote),
  });

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const data = await response.json();
  return data.data as TQuote;
};
