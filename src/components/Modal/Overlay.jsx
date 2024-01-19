"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5, ease: "easeInOut" },
};
function Overlay({ children, className, onClickOutside, animate = true }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    document.querySelector("html").style = "overflow : hidden";
    setIsMounted(true);
    return () => (document.querySelector("html").style = "overflow : ''");
  }, []);

  if (!isMounted) return;

  return createPortal(
    <motion.div
      onClick={onClickOutside}
      className={cn("overlay", className, {
        "cursor-pointer": onClickOutside,
      })}
      variants={animate ? variants : {}}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition="transition"
    >
      {children}
    </motion.div>,
    document.getElementById("modal")
  );
}

export default Overlay;
