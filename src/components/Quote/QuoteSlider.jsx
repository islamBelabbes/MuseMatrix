"use client";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import Quote from "./Quote";
import ViewQuoteModal from "./ViewQuoteModal";
import { AnimatePresence } from "framer-motion";

const params = {
  slidesPerView: 1.1,
  spaceBetween: 20,
  breakpoints: {
    1024: {
      slidesPerView: 3,
    },
  },
};

function QuoteSlider({ initializedData = [] }) {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current) {
      setIsMounted(true);
    } else {
      register();
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
    }
  }, [isMounted]);

  if (!isMounted) return;
  return (
    <div className="w-full">
      {/* view quote modal */}
      <AnimatePresence mode="wait">
        {selectedQuote && (
          <ViewQuoteModal
            quote={selectedQuote}
            closeModal={() => setSelectedQuote(null)}
          />
        )}
      </AnimatePresence>

      {/* quote slider */}
      <swiper-container init="false" ref={swiperRef} className="hidden">
        {initializedData.map((quote) => (
          <swiper-slide>
            <div
              key={quote.id}
              className="cursor-pointer"
              onClick={() => setSelectedQuote(quote)}
            >
              <Quote quote={quote} className={"h-full"} />
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
}

export default QuoteSlider;
