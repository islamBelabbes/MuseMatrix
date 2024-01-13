"use client";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import Quote from "./Quote";
import ViewQuoteModal from "./ViewQuoteModal";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

const params = {
  slidesPerView: 1.01,
  spaceBetween: 5,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

const navigationSvgDimensions = {
  width: 50,
  height: 50,
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
    <div className="relative flex justify-center w-full">
      {/* view quote modal */}
      <AnimatePresence mode="wait">
        {selectedQuote && (
          <ViewQuoteModal
            quote={selectedQuote}
            closeModal={() => setSelectedQuote(null)}
          />
        )}
      </AnimatePresence>

      <Navigation />

      {/* quote slider */}
      <div className="w-[75%] md:w-[90%]">
        <swiper-container init="false" ref={swiperRef}>
          {initializedData.map((quote) => (
            <swiper-slide key={quote.id}>
              <div
                className="cursor-pointer"
                onClick={() => setSelectedQuote(quote)}
              >
                <Quote quote={quote} className={"h-full"} />
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </div>
  );
}

const Navigation = () => {
  return (
    <>
      <button className="absolute z-10 swiper-button-prev right-0 top-[50%] translate-y-[-50%] disabled:opacity-30 disabled:cursor-not-allowed">
        <Image
          src="/arrow-right.svg"
          alt="quote"
          width={navigationSvgDimensions.width}
          height={navigationSvgDimensions.height}
        />
      </button>
      <button className="absolute z-10 swiper-button-next left-0 top-[50%] translate-y-[-50%] disabled:opacity-30 disabled:cursor-not-allowed">
        <Image
          src="/arrow-left.svg"
          alt="quote"
          width={navigationSvgDimensions.width}
          height={navigationSvgDimensions.height}
        />
      </button>
    </>
  );
};

export default QuoteSlider;
