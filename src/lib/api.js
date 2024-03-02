import axios from "axios";
import { tryCatch } from "./utils";

export const getQuotes = async ({ id, limit, page }) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quotes`);

  if (id) {
    url.searchParams.append("title", title);
  }
  if (limit) {
    url.searchParams.append("limit", limit);
  }

  if (page) {
    url.searchParams.append("page", page);
  }

  const [data, error] = await tryCatch(axios.get(url));
  if (error) throw error;
  return data.data.data;
};

export const getPosts = async ({ title, limit, page, status } = {}) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  if (title) {
    url.searchParams.append("title", title);
  }

  if (limit) {
    url.searchParams.append("limit", limit);
  }

  if (page) {
    url.searchParams.append("page", page);
  }

  if (status) {
    url.searchParams.append("status", status);
  }

  const [data, error] = await tryCatch(axios.get(url));
  if (error) throw error;

  return data.data;
};
