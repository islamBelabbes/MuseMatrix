"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Overlay({ children, className, onClickOutside, animate = true }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    document.querySelector("html").style = "overflow : hidden";
    setIsMounted(true);
    return () => (document.querySelector("html").style = "overflow : ''");
  }, []);

  const animation = animate
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.5, ease: "easeInOut" },
      }
    : {};

  if (!isMounted) return;

  return createPortal(
    <motion.div
      onClick={onClickOutside}
      className={cn("overlay", className, {
        "cursor-pointer": onClickOutside,
      })}
      {...animation}
    >
      {children}
    </motion.div>,
    document.getElementById("modal")
  );
}

export default Overlay;
