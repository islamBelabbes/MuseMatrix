import Image from "next/image";
import React from "react";
import heroImg from "../../../public/hero.jpg";

function Hero() {
  return (
    <section className="relative">
      <div className="w-full h-[300px] md:h-[500px] rounded-xl   ">
        <Image
          src={heroImg}
          alt="hero"
          className="object-cover h-full rounded-xl"
          placeholder="blur"
        />
      </div>
    </section>
  );
}

export default Hero;
