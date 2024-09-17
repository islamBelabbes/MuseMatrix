"use client";

import Quote from "@/components/quote";
import { TQuote } from "@/dto/quotes";
import { MEDIA_URL } from "@/lib/constants";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

function QuotesSlider({ quotes }: { quotes: TQuote[] }) {
  const emblaOptions: EmblaOptionsType = {
    direction: "rtl",
  };

  const [emblaRef] = useEmblaCarousel(emblaOptions);

  return (
    <div className="overflow-hidden rounded-xl" ref={emblaRef}>
      <div className="flex gap-1">
        {quotes.map((quote) => (
          <Quote
            key={quote.id}
            author={{
              avatar: `${MEDIA_URL}/${quote.author.avatar}`,
              name: quote.author.name,
            }}
            quote={quote.quote}
            color={quote.color}
            post={quote.post ?? undefined}
            className="shrink-0 grow-0 basis-[95%] select-none"
          />
        ))}
      </div>
    </div>
  );
}

export default QuotesSlider;
