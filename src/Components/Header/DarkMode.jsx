"use client";
import React from "react";
import Image from "next/image";
import { useDarkMode } from "@/context/DarkModeProvider";
import Conditional from "../Conditional";
function DarkMode() {
  const { toggle, status } = useDarkMode();

  const clickHandler = () => {
    toggle((prev) => !prev);
  };
  return (
    <div className="flex justify-end ">
      <Conditional
        condition={status}
        onTrue={
          <div className="cursor-pointer" onClick={clickHandler}>
            <Image
              src={"/theme.png"}
              width={24}
              height={24}
              alt="turn on darkmode"
              className="white_filter"
            />
          </div>
        }
        onFalse={
          <div className="cursor-pointer" onClick={clickHandler}>
            <Image
              src={"/theme.png"}
              width={24}
              height={24}
              alt="turn off darkmode"
            />
          </div>
        }
      />
    </div>
  );
}

export default DarkMode;
