"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import CollapsedSection from "./collapsed-section";

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
        "flex flex-col rounded-xl border border-secondary p-[24px] leading-10",
      )}
      id="content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default PostContentViewer;
