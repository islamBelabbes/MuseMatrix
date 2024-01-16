import axios from "axios";

export const getQuotes = async (quoteId) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quotes`);
  if (quoteId) {
    url.searchParams.append("limit", 10);
  }
  const data = await axios.get(url);
  return data.data.data;
};
