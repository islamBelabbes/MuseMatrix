"use client";

import LoadMoreButton from "@/components/load-more-button";
import Quote from "@/components/quote";
import { TQuote } from "@/dto/quotes";
import { MEDIA_URL } from "@/lib/constants";
import { useQuotesInfiniteQuery } from "@/lib/react-query/queries";
import { TDataWithPagination } from "@/types/types";

function QuoteList({
  quotes,
  limit,
}: {
  quotes: TDataWithPagination<TQuote[]>;
  limit: number;
}) {
  const { data, isFetchingNextPage, isError, fetchNextPage, hasNextPage } =
    useQuotesInfiniteQuery(limit, quotes);

  const mappedQuotes = data?.pages.reduce<TQuote[]>((acc, current) => {
    return [...acc, ...current.data];
  }, []);

  if (isError) return;
  return (
    <div className="flex flex-col items-center gap-4">
      <ul className="grid w-full grid-cols-[repeat(auto-fill,minmax(263px,1fr))] justify-center gap-5">
        {mappedQuotes?.map((quote) => (
          <Quote
            key={quote.id}
            author={{
              avatar: `${MEDIA_URL}/${quote.author.avatar}`,
              name: quote.author.name,
            }}
            quote={quote.quote}
            color={quote.color}
            post={quote.post ?? undefined}
          />
        ))}
      </ul>

      {hasNextPage && (
        <LoadMoreButton
          onClick={fetchNextPage}
          isLoading={isFetchingNextPage}
        />
      )}
    </div>
  );
}

export default QuoteList;
