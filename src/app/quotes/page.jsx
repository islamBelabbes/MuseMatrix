import QuoteListing from "@/components/Quote/QuoteListing";
import { getQuotes } from "@/lib/db";
import { unstable_cache as cache } from "next/cache";

export const metadata = {
  title: "Quotes",
};

const cachedGetQuotes = cache(
  async () => getQuotes({ limit: 10, page: 1 }),
  ["quotes"],
  { tags: ["quotes"] }
);

async function page() {
  const quotes = await cachedGetQuotes();

  return (
    <div className="app">
      <QuoteListing initialData={quotes} />
    </div>
  );
}

export default page;
