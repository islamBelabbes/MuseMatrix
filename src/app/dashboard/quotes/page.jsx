import React from "react";
import { QuotesTable } from "../_components/tables/QuotesTable/Table";
import { getQuotes } from "@/lib/db";

const query = { limit: 1, page: 1 };
async function page() {
  const quotes = await getQuotes({ ...query });
  return <QuotesTable initialData={quotes} queryKey={"quotes"} query={query} />;
}

export default page;
