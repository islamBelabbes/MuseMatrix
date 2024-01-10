import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Quote from "./Quote";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

const DeleteQuoteModal = dynamic(() => import("./DelateQuoteModal"));
function ViewQuoteModal({ quote, closeModal }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal onClickOutside={closeModal}>
      <AnimatePresence>
        {isOpen && (
          <DeleteQuoteModal id={quote.id} closeModal={() => setIsOpen(false)} />
        )}
      </AnimatePresence>

      <div className="p-5">
        <Quote quote={quote} isModal>
          {/* quote topBar */}
          <div className="absolute flex justify-between w-full px-2 top-3">
            <button onClick={closeModal} className="button_primary ">
              {"عودة"}
            </button>
            <button
              className="button_secondary "
              onClick={() => setIsOpen(true)}
            >
              حذف
            </button>
          </div>
        </Quote>
      </div>
    </Modal>
  );
}

export default ViewQuoteModal;
