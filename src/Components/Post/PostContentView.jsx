"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

function PostContentView({
  htmlContent = null,
  initialization = null,
  Minimized = true,
}) {
  const [isMinimized, setIsMinimized] = useState(Minimized);
  useEffect(() => {
    initialization && initialization();
  }, []);

  return (
    <div className="relative">
      <button
        className="absolute top-0 left-0 z-10 translate-x-2 translate-y-2"
        onClick={() => setIsMinimized((prev) => !prev)}
      >
        {isMinimized ? "➕" : "➖"}
      </button>
      <article
        className={cn(
          "flex flex-col  p-[24px] border border-Secondary rounded-xl leading-10",
          {
            "h-[100px] overflow-hidden": isMinimized,
          }
        )}
        id="content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></article>
    </div>
  );
}

export default PostContentView;
