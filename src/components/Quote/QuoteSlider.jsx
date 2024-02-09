"use client";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import Quote from "./Quote";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

const ViewQuoteModal = dynamic(() => import("./ViewQuoteModal"));

const swiperParams = {
  slidesPerView: 1,
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
  const [selectedQuote, setSelectedQuote] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    register();
    Object.assign(swiperRef.current, swiperParams);
    swiperRef.current.initialize();
  }, []);

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
        <swiper-container
          init="false"
          ref={swiperRef}
          style={{ display: "flex", overflow: "hidden" }}
        >
          {initializedData.map((quote, index) => (
            <swiper-slide
              key={quote.id}
              style={{
                flex: "1 0 100%",
              }}
            >
              <div
                className="h-full cursor-pointer"
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
