"use client";
import Modal from "./Modal";
import { useState } from "react";
import Conditional from "../Conditional";
import BlockUi from "../BlockUi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function DeleteModal({
  onDelete,
  onOpenChange,
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
    onDelete();
  };

  return (
    <Dialog open className="relative w-auto" onOpenChange={onOpenChange}>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  );
}

export default DeleteModal;
