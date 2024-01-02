import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Conditional from "../Conditional";

function Quote({ background = "#262D33", avatar, content, author, book }) {
  return (
    <li
      className="flex items-center gap-5 flex-col h-[370px]  rounded-xl py-7 "
      style={{ background: background }}
    >
      <div
        className={cn("w-[156px] h-[156px]", {
          "rounded-full bg-white border": !avatar,
        })}
      >
        <Conditional
          condition={avatar}
          onTrue={
            <Image
              src={avatar}
              alt="author avatar"
              width={156}
              height={156}
              className="block object-cover w-full h-full rounded-full"
              placeholder="empty"
            />
          }
        />
      </div>
      <div className="px-3 text-center text-white">
        <p className="text-xs font-medium leading-4 line-clamp-1">{author}</p>
        <span
          className="text-base font-bold leading-6 line-clamp-3"
          style={{ overflowWrap: "anywhere" }}
        >
          {content}
        </span>
      </div>
      <div className="flex items-center self-stretch justify-center mt-auto text-center text-white border-t">
        <span className="mt-2">{book}</span>
      </div>
    </li>
  );
}

export default Quote;
