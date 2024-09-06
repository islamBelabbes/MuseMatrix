import Quote from "@/components/quote";
import { TQuote } from "@/dtos/quotes";

function QuoteList({ quotes }: { quotes: TQuote[] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(263px,1fr))] justify-center gap-5">
      {quotes.map((quote) => (
        <Quote
          key={quote.id}
          id={quote.id}
          author={{
            avatar: quote.author.avatar,
            name: quote.author.name,
          }}
          quote={quote.quote}
          color={quote.color}
          post={quote.post ?? undefined}
        />
      ))}
    </ul>
  );
}

export default QuoteList;
