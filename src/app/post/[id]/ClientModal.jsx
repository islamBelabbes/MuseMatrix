"use client";
import Conditional from "@/components/Conditional";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const DeletePostModal = dynamic(() =>
  import("@/components/Post/DeletePostModal")
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
      <Conditional
        condition={isOpen}
        onTrue={<DeletePostModal id={id} setIsOpen={setIsOpen} />}
      />
    </>
  );
}

export default ClientModal;
