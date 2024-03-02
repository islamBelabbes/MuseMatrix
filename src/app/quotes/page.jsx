import QuoteListing from "@/components/Quote/QuoteListing";
import { getQuotes } from "@/lib/db";

export const metadata = {
  title: "Quotes",
};
async function page() {
  const quotes = await getQuotes({ limit: 10, page: 1 });
  return (
    <div className="app">
      <QuoteListing initialData={quotes} />
    </div>
  );
}

export default page;
