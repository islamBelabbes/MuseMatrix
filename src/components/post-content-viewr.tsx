"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type PostContentViewerProps = {
  htmlContent: string;
  initialization?: () => void;
  Minimized?: boolean;
};

function PostContentViewer({
  htmlContent,
  initialization,
  Minimized = true,
}: PostContentViewerProps) {
  const [isMinimized, setIsMinimized] = useState(Minimized);
  useEffect(() => {
    initialization?.();
  }, [initialization]);

  return (
    <div className="relative">
      <button
        className="absolute left-0 top-0 z-10 translate-x-2 translate-y-2"
        onClick={() => setIsMinimized((prev) => !prev)}
        type="button"
      >
        {isMinimized ? "➕" : "➖"}
      </button>
      <article
        className={cn(
          "flex flex-col rounded-xl border border-secondary p-[24px] leading-10",
          {
            "h-[100px] overflow-hidden": isMinimized,
          },
        )}
        id="content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></article>
    </div>
  );
}

export default PostContentViewer;
