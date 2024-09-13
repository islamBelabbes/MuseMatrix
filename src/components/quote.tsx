"use client";
import Link from "next/link";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import AuthorAvatar from "@/components/author-avatar";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { TQuote } from "@/dtos/quotes";
import { MEDIA_URL } from "@/lib/constants";

const DEFAULT_COLOR = "#262D33";

type TQuoteProps = Pick<TQuote, "id" | "color" | "quote"> & {
  post?: Pick<NonNullable<TQuote["post"]>, "id" | "title">;
  author: Pick<NonNullable<TQuote["author"]>, "name" | "avatar">;
  className?: string;
  showFullContent?: boolean;
};

type TQuoteContentProps = TQuoteProps & { onClick?: () => void };

function Quote({ className, showFullContent = false, ...quote }: TQuoteProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <QuoteContent
        className={className}
        showFullContent={showFullContent}
        onClick={() => setShowModal(true)}
        {...quote}
      />

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="color w-[90vw] rounded-none border-none bg-[none] bg-none p-0 shadow-none sm:w-[500px]">
          <QuoteContent
            className={className}
            showFullContent={showFullContent}
            {...quote}
          />
          <DialogClose className="hidden bg-white" />
        </DialogContent>
      </Dialog>
    </>
  );
}

const QuoteContent = ({
  className,
  showFullContent = false,
  onClick,
  ...quote
}: TQuoteContentProps) => {
  return (
    <li
      className={cn(
        "relative flex min-h-[370px] flex-col items-center gap-5 rounded-xl py-7",
        className,
        {
          "cursor-pointer": onClick,
        },
      )}
      style={{ background: quote.color ?? DEFAULT_COLOR }}
      onClick={onClick}
    >
      {/* <div className="w-full top__bar">{children}</div> */}

      <AuthorAvatar avatar={quote.author.avatar} />

      <div className="px-3 text-center text-white">
        <p className={cn("line-clamp-1 text-xs font-medium leading-4")}>
          {quote.author.name}
        </p>
        <span
          className={cn("text-base font-bold leading-6", {
            "line-clamp-3": !showFullContent,
          })}
          style={{ overflowWrap: "anywhere" }}
        >
          {quote.quote}
        </span>
      </div>

      {quote.post && (
        <div
          className="mt-auto flex items-center justify-center self-stretch border-t px-2 text-center text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <Link href={`/post/${quote.post.id}`} className="mt-2 line-clamp-1">
            {quote.post.title}
          </Link>
        </div>
      )}
    </li>
  );
};

export default Quote;
