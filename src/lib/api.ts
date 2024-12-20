import { TCreateAuthor, TGetAuthors } from "@/schema/author";
import { TDataWithPagination, TPaginationQuery } from "@/types/types";
import { generateSearchParams } from "./utils";
import { TAuthor } from "@/dto/authors";
import { TCreateGenre, TGetGenres } from "@/schema/genre";
import { TGenre } from "@/dto/genres";
import { TCreatePost, TGetPosts, TUpdatePost } from "@/schema/posts";
import { TPost } from "@/dto/posts";
import { AppError } from "./error";
import { TCreateQuote, TUpdateQuote } from "@/schema/quotes";
import { TQuote } from "@/dto/quotes";

// Global
export const deleteEntry = async (route: string) => {
  const response = await fetch(`/api/${route}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  return true;
};

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
export const getPosts = async (params: TGetPosts & TPaginationQuery) => {
  const searchParams = generateSearchParams(params);
  const response = await fetch(`/api/posts?${searchParams.toString()}`);
  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const data = await response.json();
  return data?.data as TDataWithPagination<TPost[]>;
};

export const createPost = async (post: TCreatePost) => {
  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("status", post.status);
  formData.append("content", post.content);
  formData.append("cover", post.cover);
  formData.append("genreId", post.genreId.toString());
  formData.append("authorId", post.authorId.toString());

  const response = await fetch("/api/posts", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }
  const data = await response.json();
  return data.data as TPost;
};

export const updatePost = async (post: TUpdatePost) => {
  const formData = new FormData();
  post.title && formData.append("title", post.title);
  post.content && formData.append("content", post.content);
  post.cover && formData.append("cover", post.cover);
  post.genreId && formData.append("genreId", post.genreId.toString());
  post.authorId && formData.append("authorId", post.authorId.toString());
  post.status && formData.append("status", post.status);

  const response = await fetch("/api/posts/" + post.id, {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const data = await response.json();
  return data.data as TPost;
};

// Quotes

export const getQuotes = async (params: TPaginationQuery) => {
  const searchParams = generateSearchParams(params);
  const response = await fetch(`/api/quotes?${searchParams.toString()}`);

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const data = await response.json();
  return data?.data as TDataWithPagination<TQuote[]>;
};

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
  const { id, ...rest } = quote;
  const response = await fetch("/api/quotes/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rest),
  });

  if (!response.ok) {
    throw new AppError("something went wrong", response.status);
  }

  const data = await response.json();
  return data.data as TQuote;
};
