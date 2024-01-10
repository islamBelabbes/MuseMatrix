import React from "react";
import Modal from "../Modal/Modal";
import Quote from "./Quote";

function ViewQuoteModal({ quote, closeModal }) {
  return (
    <Modal onClickOutside={closeModal}>
      <div className="p-5">
        <Quote quote={quote} modal={{ closeModal: closeModal }} />
      </div>
    </Modal>
  );
}

export default ViewQuoteModal;
