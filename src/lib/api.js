import axios from "axios";

export const getQuotes = async (quoteId) => {
  const url = new URL(`https://muse-matrix-blog.vercel.app/api/quotes`);
  if (quoteId) {
    url.searchParams.append("limit", 10);
  }
  const data = await axios.get(url);
  return data.data.data;
};
