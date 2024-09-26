"use client";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

type PostContentViewerProps = {
  htmlContent: string;
  initialization?: () => void;
};

function PostContentViewer({
  htmlContent,
  initialization,
}: PostContentViewerProps) {
  useEffect(() => {
    initialization?.();
  }, [initialization]);

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
