"use client";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

function Overlay({ children, styles, onClick }) {
  useEffect(() => {
    document.querySelector("html").style = "overflow : hidden";

    return () => (document.querySelector("html").style = "overflow : ''");
  }, []);
  if (!document.getElementById("modal")) return;
  return createPortal(
    <motion.div
      onClick={onClick}
      className={`overlay ${styles}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>,
    document.getElementById("modal")
  );
}

export default Overlay;
