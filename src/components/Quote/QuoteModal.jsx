import React from "react";
import Modal from "../Modal/Modal";
import Quote from "./Quote";

function QuoteModal({ quote, closeModal }) {
  return (
    <Modal>
      <Quote quote={quote} modal={{ closeModal: closeModal }} />
    </Modal>
  );
}

export default QuoteModal;
