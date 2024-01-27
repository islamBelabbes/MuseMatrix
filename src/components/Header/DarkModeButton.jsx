"use client";
import React from "react";
import Image from "next/image";
import Conditional from "../Conditional";
import { useTheme } from "next-themes";
function DarkModeButton() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-end ">
      <Conditional
        condition={theme === "light"}
        onTrue={
          <div className="cursor-pointer" onClick={() => setTheme("dark")}>
            <Image
              src={"/theme.png"}
              width={24}
              height={24}
              alt="turn on darkmode"
            />
          </div>
        }
        onFalse={
          <div className="cursor-pointer" onClick={() => setTheme("light")}>
            <Image
              src={"/theme.png"}
              width={24}
              height={24}
              alt="turn off darkmode"
              className="white_filter"
            />
          </div>
        }
      />
    </div>
  );
}

export default DarkModeButton;
