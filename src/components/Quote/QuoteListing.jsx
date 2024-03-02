"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Quote from "./Quote";
import { getQuotes } from "@/lib/api";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const ViewQuoteModal = dynamic(() => import("./ViewQuoteModal"));
function QuotesView({ initialData }) {
  const [selectedQuote, setSelectedQuote] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["quotes"],
    queryFn: () => getQuotes({ limit: 10, page: 1 }),
    initialData: initialData,
    refetchOnWindowFocus: false,
  });

  const quotes = data.data || [];
  if (error) return "An error has occurred: " + error.message;
  if (isLoading) return;
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(263px,1fr))] justify-center gap-5">
      {/* view quote modal */}
      <AnimatePresence mode="wait">
        {selectedQuote && (
          <ViewQuoteModal
            quote={selectedQuote}
            closeModal={() => setSelectedQuote(null)}
          />
        )}
      </AnimatePresence>

      {/* quotes */}
      {quotes.map((quote) => (
        <div
          key={quote.id}
          className="cursor-pointer"
          onClick={() => setSelectedQuote(quote)}
        >
          <Quote quote={quote} className={"h-full"} />
        </div>
      ))}
    </ul>
  );
}

export default QuotesView;
