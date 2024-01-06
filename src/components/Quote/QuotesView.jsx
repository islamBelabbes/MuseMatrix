"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import Quote from "./Quote";
import Image from "next/image";
import QuoteModal from "./QuoteModal";
import { getQuotes } from "@/lib/api";
import { AnimatePresence } from "framer-motion";

function QuotesView({ initialData }) {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const {
    data: quotes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quotes"],
    queryFn: () => getQuotes(),
    initialData: initialData,
  });
  if (error) return "An error has occurred: " + error.message;
  if (isLoading) return;
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(263px,1fr))] justify-center gap-5">
      {/* view quote modal */}
      <AnimatePresence mode="wait">
        {selectedQuote && (
          <QuoteModal
            quote={selectedQuote}
            closeModal={() => setSelectedQuote(null)}
          />
        )}
      </AnimatePresence>

      {/* Add New Quote */}
      <li className="flex flex-col items-center self-stretch justify-center gap-5 border border-black rounded-xl py-7">
        <Link prefetch={false} href="/quotes/create">
          <Image
            alt="add new"
            src="/add-new.png"
            width={100}
            height={100}
            className="object-contain cursor-pointer"
          />
        </Link>
      </li>

      {/* quotes */}
      {quotes.map((quote) => (
        <Quote
          key={quote.id}
          quote={quote}
          modal={{ openModal: () => setSelectedQuote(quote) }}
        />
      ))}
    </ul>
  );
}

export default QuotesView;
