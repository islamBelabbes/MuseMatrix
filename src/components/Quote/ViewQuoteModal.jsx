"use client";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Quote from "./Quote";

function ViewQuoteModal({ quote, closeModal }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal onClickOutside={closeModal}>
      <div className="p-5">
        <Quote quote={quote} isModal>
          {/* quote topBar */}
          <div className="absolute flex justify-between w-full px-2 top-3">
            <button onClick={closeModal} className="button_primary ">
              {"عودة"}
            </button>
          </div>
        </Quote>
      </div>
    </Modal>
  );
}

export default ViewQuoteModal;
