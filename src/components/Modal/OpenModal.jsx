"use client";
import { useModal } from "@/context/GlobalModalProvider";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

function OpenModal({ modal, icon, alt = "modal button", styles }) {
  const { openModal } = useModal();

  return (
    <div
      onClick={() => openModal(modal)}
      className={twMerge(`cursor-pointer`, styles)}
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
