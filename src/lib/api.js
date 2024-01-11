import axios from "axios";

export const getQuotes = async (quoteId) => {
  const base =
    process.env.NODE_ENV === "production"
      ? process.env.LIVE_URL
      : "http://localhost:3000";

  const url = new URL(`${base}/api/quotes`);
  if (quoteId) {
    url.searchParams.append("limit", 10);
  }
  const data = await axios.get(url);
  return data.data.data;
};
