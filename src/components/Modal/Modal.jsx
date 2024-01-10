"use client";
import Overlay from "./Overlay";

function Modal({ children, onClickOutside, animate = true }) {
  return (
    <Overlay
      className="flex items-center justify-center"
      onClickOutside={onClickOutside}
      animate={animate}
    >
      <div
        className="relative cursor-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </Overlay>
  );
}

export default Modal;
