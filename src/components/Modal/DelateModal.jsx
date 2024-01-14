"use client";
import Modal from "../Modal/Modal";
import { useState } from "react";
import Conditional from "../Conditional";
import BlockUi from "../BlockUi";
function DelateModal({
  onDelate,
  onClickOutside,
  confirmWord = "Delete",
  entry,
  blockUi,
}) {
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState("");

  const changeHandler = (e) => {
    setError(false);
    setConfirm(e.target.value);
  };

  const DeleteHandle = () => {
    if (confirm !== confirmWord) {
      return setError(true);
    }
    onDelate();
  };

  return (
    <Modal onClickOutside={blockUi ? null : onClickOutside}>
      <BlockUi isBlock={blockUi}>
        <div className="p-6 bg-white border border-Secondary min-w-[500px] relative">
          <div className="flex flex-col items-center gap-3">
            <h1>{entry}</h1>
            <input
              type="text"
              onChange={changeHandler}
              onKeyDown={(e) => e.key === "Enter" && DeleteHandle()}
              value={confirm}
              dir="ltr"
              className={`w-full text-center input_primary rtl ${
                error ? "!border-red-700 border" : null
              }`}
            />
            <Conditional
              condition={error}
              onTrue={
                <span className="text-red-700">please enter {confirmWord}</span>
              }
            />
            <button
              onClick={DeleteHandle}
              className="w-full button_primary"
              disabled={blockUi}
            >
              Delete
            </button>
          </div>
        </div>
      </BlockUi>
    </Modal>
  );
}

export default DelateModal;
