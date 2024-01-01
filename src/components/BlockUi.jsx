"use client";
import { ClipLoader } from "react-spinners";
import Conditional from "./Conditional";
import { cn } from "@/lib/utils";

function BlockUi({
  children,
  classNames = { container: null, spinner: null },
  isBlock,
}) {
  return (
    <div
      className={cn("relative ", classNames.container, {
        "cursor-not-allowed": isBlock,
      })}
    >
      <Conditional
        condition={isBlock}
        onTrue={
          <div
            className={cn(
              "absolute z-10 flex items-center justify-center w-full h-full bg-black/30 dark:bg-white/30",
              classNames.spinner
            )}
          >
            <ClipLoader color="#4B6BFB" />
          </div>
        }
      />

      {children}
    </div>
  );
}

export default BlockUi;
