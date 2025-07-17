"use client";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import AuthorAvatar from "@/components/author-avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TQuote } from "@/dto/quotes";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const DEFAULT_COLOR = "#262D33";

type TQuoteProps = Pick<TQuote, "color" | "quote"> & {
  post?: Pick<NonNullable<TQuote["post"]>, "id" | "title">;
  author: Pick<NonNullable<TQuote["author"]>, "name" | "avatar">;
  className?: string;
};

type QuoteContentProps = TQuoteProps & { showFullContent?: boolean };

// TODO : Make Quote Trigger accessible via keyboard

function Quote({ className, ...quote }: TQuoteProps) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <QuoteContent
            className={cn("cursor-pointer", className)}
            tabIndex={0}
            {...quote}
          />
        </DialogTrigger>

        <DialogContent
          className="color w-[90vw] rounded-none border-none bg-[none] bg-none
            p-0 shadow-none sm:w-[500px]"
        >
          <VisuallyHidden>
            <DialogTitle hidden>محتوى الاقتباس</DialogTitle>
          </VisuallyHidden>

          <QuoteContent
            className={className}
            showFullContent={true}
            {...quote}
          />

          <DialogClose className="hidden bg-white" />
        </DialogContent>
      </Dialog>
    </>
  );
}

const QuoteContent = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement> & QuoteContentProps
>(
  (
    {
      className,
      showFullContent = false,
      author,
      color,
      quote,
      post,
      ...props
    },
    ref,
  ) => {
    return (
      <li
        dir="auto"
        className={cn(
          `relative flex min-h-[370px] flex-col items-center gap-5 rounded-xl
          py-7`,
          className,
        )}
        style={{ background: color ?? DEFAULT_COLOR }}
        ref={ref}
        {...props}
      >
        {/* <div className="w-full top__bar">{children}</div> */}

        <AuthorAvatar avatar={author.avatar} />

        <div className="px-3 text-center text-white">
          <p className={cn("line-clamp-1 text-xs leading-4 font-medium")}>
            {author.name}
          </p>
          <span
            className={cn("text-base leading-6 font-bold", {
              "line-clamp-3": !showFullContent,
            })}
            style={{ overflowWrap: "anywhere" }}
          >
            {quote}
          </span>
        </div>

        {post && (
          <div
            className="mt-auto flex items-center justify-center self-stretch
              border-t px-2 text-center text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Link href={`/post/${post.id}`} className="mt-2 line-clamp-1">
              {post.title}
            </Link>
          </div>
        )}
      </li>
    );
  },
);

export default Quote;
