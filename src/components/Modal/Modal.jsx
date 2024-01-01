"use client";
import Image from "next/image";
import Overlay from "./Overlay";
import { useModal } from "@/context/GlobalModalProvider";

function Modal({ children, keyProp, isGlobal = false, localOnClose = null }) {
  const { closeModals } = useModal(); // aka globalOnClose
  return (
    <Overlay styles={"flex justify-center items-center"} keyProp={keyProp}>
      <div className="p-6 bg-white border border-Secondary min-w-[500px] relative">
        <div
          className="absolute top-0 right-0 cursor-pointer"
          onClick={isGlobal ? closeModals : localOnClose}
        >
          <Image width={24} height={24} src={"/close.png"} alt="close" />
        </div>
        {children}
      </div>
    </Overlay>
  );
}

export default Modal;
