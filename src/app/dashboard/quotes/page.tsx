import { PageSchema } from "@/schema/schema";
import CreateButton from "../_components/create-button";
import { getQuotesUseCase } from "@/use-cases/quotes";
import QuotesTable from "./_components/quotes-table";

const LIMIT = 10;

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const _page = (await searchParams).page;
  const page = PageSchema.parse(_page);
  const quotes = await getQuotesUseCase({
    limit: LIMIT,
    page,
  });
  return (
    <div>
      <CreateButton href="/dashboard/quotes/create">إنشاء اقتباس</CreateButton>
      <QuotesTable limit={LIMIT} quotes={quotes} />
    </div>
  );
}
