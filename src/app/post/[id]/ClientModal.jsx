"use client";
import Image from "next/image";
import { useState } from "react";

import { AnimatePresence } from "framer-motion";

const DeletePostModal = dynamic(() =>
  import("@/app/dashboard/posts/_components/DeletePostModal")
);

function ClientModal({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <Image
          src={"/remove.svg"}
          width={24}
          height={24}
          alt={"deletepost"}
          className="white_filter"
        />
      </button>

      <AnimatePresence>
        {isOpen && <DeletePostModal id={id} setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </>
  );
}

export default ClientModal;
