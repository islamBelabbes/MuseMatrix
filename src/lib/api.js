import axios from "axios";

export const getQuotes = async (quoteId) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quotes`);
  if (quoteId) {
    url.searchParams.append("limit", 10);
  }
  const data = await axios.get(url);
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

  const data = await axios.get(url);
  return data.data;
};
