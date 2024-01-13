"use client";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
import Quote from "./Quote";

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
    <div className="">
      <swiper-container init="false" ref={swiperRef} className="hidden">
        {initializedData.map((quote) => (
          <swiper-slide>
            <Quote quote={quote} />
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
}

export default QuoteSlider;
