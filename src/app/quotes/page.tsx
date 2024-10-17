import React from "react";
import QuoteList from "./_components/quote-list";
import { getQuotesUseCase } from "@/use-cases/quotes";
import { generateSeoTitle } from "@/lib/utils";

const DATA_LIMIT = 12;

export async function generateMetadata() {
  return {
    title: generateSeoTitle(["اقتباسات"]),
  };
}

async function QuotesPage() {
  const quotes = await getQuotesUseCase({ limit: DATA_LIMIT });
  return (
    <main className="app">
      <QuoteList quotes={quotes} limit={DATA_LIMIT} />
    </main>
  );
}

export default QuotesPage;
