"use client";
import React from "react";
import Overlay from "./Overlay";
import Image from "next/image";
import { motion } from "framer-motion";
import { useModal } from "@/context/GlobalModalProvider";
function SideModal({ children, keyProp }) {
  const { closeModals } = useModal();
  return (
    <Overlay keyProp={keyProp}>
      <motion.div
        initial={{ translateX: "100vw", opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        exit={{ translateX: "100vw", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-[100%] md:w-[20%] h-screen fixed right-0 bg-white  dark:bg-[#161513] p-3 flex items-center"
      >
        <div
          className="absolute top-0 right-0 translate-x-[-20px] translate-y-[20px] cursor-pointer"
          onClick={closeModals}
        >
          <Image
            src={"/close.png"}
            width={24}
            height={24}
            alt="close"
            className="white_filter"
          />
        </div>
        <div className="h-[90%] w-full overflow-y-auto">{children}</div>
      </motion.div>
    </Overlay>
  );
}

export default SideModal;
