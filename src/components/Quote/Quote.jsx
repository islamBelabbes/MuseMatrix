import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Conditional from "../Conditional";
import Link from "next/link";
const DEFAULT_COLOR = "#262D33";
function Quote({ quote = {}, isModal = false, children, className }) {
  const { author, quote: quoteContent, post, color } = quote;
  const { id: postId, title: postTitle } = post;
  const { name: authorName, avatar: authorAvatar } = author;
  return (
    <li
      className={cn(
        "flex items-center gap-5 flex-col min-h-[370px]  rounded-xl py-7 relative",
        className,
        {
          "sm:w-[500px] w-[90vw] ": isModal,
        }
      )}
      style={{ background: color || DEFAULT_COLOR }}
    >
      <div className="w-full top__bar">{children}</div>
      <div
        className={cn("w-[156px] h-[156px]", {
          "rounded-full bg-white border": !authorAvatar,
        })}
      >
        <Conditional
          condition={authorAvatar}
          onTrue={
            <Image
              src={authorAvatar}
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
        <p className={cn("text-xs font-medium leading-4 line-clamp-1")}>
          {authorName}
        </p>
        <span
          className={cn("text-base font-bold leading-6", {
            "line-clamp-3": !isModal,
          })}
          style={{ overflowWrap: "anywhere" }}
        >
          {quoteContent}
        </span>
      </div>
      <Conditional
        condition={postTitle && postId}
        onTrue={
          <div
            className="flex items-center self-stretch justify-center px-2 mt-auto text-center text-white border-t"
            onClick={(e) => e.stopPropagation()}
          >
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
