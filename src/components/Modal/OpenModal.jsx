"use client";
import { useModal } from "@/context/GlobalModalProvider";
import { cn } from "@/lib/utils";
import Image from "next/image";

function OpenModal({ modal, icon, alt = "modal button", styles }) {
  const { openModal } = useModal();

  return (
    <div
      onClick={() => openModal(modal)}
      className={cn(`cursor-pointer`, styles)}
    >
      <Image
        src={icon}
        width={24}
        height={24}
        alt={alt}
        className="white_filter"
      />
    </div>
  );
}

export default OpenModal;
