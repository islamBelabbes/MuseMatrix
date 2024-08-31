import React from "react";
import QuoteList from "./_components/quote-list";
import { getQuotesUseCase } from "@/use-cases/quotes";
import { generateSeoTitle } from "@/lib/utils";

export async function generateMetadata() {
  return {
    title: generateSeoTitle(["اقتباسات"]),
  };
}

async function QuotesPage() {
  const quotes = await getQuotesUseCase({ limit: 10 });
  return (
    <main className="app">
      <QuoteList quotes={quotes.data} />
    </main>
  );
}

export default QuotesPage;
