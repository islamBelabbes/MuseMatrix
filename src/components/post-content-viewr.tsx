"use client";
import { cn } from "@/lib/utils";

type PostContentViewerProps = {
  htmlContent: string;
};

function PostContentViewer({ htmlContent }: PostContentViewerProps) {
  return (
    <article
      className={cn(
        "muse-content flex flex-col rounded-xl border border-secondary p-[24px] leading-10",
      )}
      id="content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default PostContentViewer;
