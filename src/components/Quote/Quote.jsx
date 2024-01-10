import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Conditional from "../Conditional";
import Link from "next/link";
const DEFAULT_COLOR = "#262D33";
function Quote({ quote = {}, modal = {} }) {
  // quote
  const { author, quote: quoteContent, post, color } = quote;

  // post
  const { id: postId, title: postTitle } = post;

  // author
  const { name: authorName, avatar: authorAvatar } = author;

  // modal
  const { openModal, closeModal } = modal;
  const isModal = Boolean(closeModal);
  return (
    <li
      className={cn(
        "flex items-center gap-5 flex-col min-h-[370px]  rounded-xl py-7 relative",
        {
          "w-fit max-w-[500px]": isModal,
        }
      )}
      style={{ background: color || DEFAULT_COLOR }}
    >
      {isModal && (
        <button
          onClick={closeModal}
          className="absolute font-bold right-3 top-3"
        >
          {"عودة"}
        </button>
      )}

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

        <Conditional
          condition={isModal}
          onTrue={
            <span
              className="text-base font-bold leading-6 "
              style={{ overflowWrap: "anywhere" }}
            >
              {quoteContent}
            </span>
          }
          onFalse={
            <span
              onClick={openModal}
              className={cn(
                "text-base font-bold leading-6 cursor-pointer line-clamp-3"
              )}
              style={{ overflowWrap: "anywhere" }}
            >
              {quoteContent}
            </span>
          }
        />
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
