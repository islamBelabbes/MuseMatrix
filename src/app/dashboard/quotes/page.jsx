import { getQuotes } from "@/lib/db";
import { QuotesTable } from "./_components/QuotesTable/Table";

const query = { limit: 10, page: 1 };
async function page() {
  const quotes = await getQuotes({ ...query });
  return <QuotesTable initialData={quotes} queryKey={"quotes"} query={query} />;
}

export default page;
