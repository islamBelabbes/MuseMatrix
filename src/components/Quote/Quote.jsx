import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Conditional from "../Conditional";
import Link from "next/link";
const DEFAULT_COLOR = "#262D33";
function Quote({
  background = DEFAULT_COLOR,
  avatar,
  content,
  author,
  postTitle,
  postId,
}) {
  return (
    <li
      className="flex items-center gap-5 flex-col h-[370px]  rounded-xl py-7 "
      style={{ background: background || DEFAULT_COLOR }}
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
      <Conditional
        condition={postTitle && postId}
        onTrue={
          <div className="flex items-center self-stretch justify-center mt-auto text-center text-white border-t">
            <Link href={`/post/${postId}`} className="mt-2 line-clamp-1">
              {postTitle}
            </Link>
          </div>
        }
      />
    </li>
  );
}

export default Quote;
