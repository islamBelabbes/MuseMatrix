import QuotesView from "@/components/Quote/QuotesView";
import { getQuotes } from "@/lib/db";
import { tryCatch } from "@/lib/utils";

async function page() {
  const [quotes, error] = await tryCatch(getQuotes());
  if (error) throw error;

  return (
    <div className="app">
      <QuotesView initialData={quotes} />
    </div>
  );
}

export default page;
