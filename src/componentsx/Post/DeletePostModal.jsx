"use client";
import Modal from "../Modal/Modal";
import { useState } from "react";
import Conditional from "../Conditional";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import BlockUi from "../BlockUi";
import { useRouter } from "next/navigation";
const CONFIRM_WORD = "Delete";
function DeletePostModal({ id, setIsOpen }) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [confirm, setConfirm] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id }) => axios.delete("/api/post", { data: { id } }),
  });

  const changeHandler = (e) => {
    setError(false);
    setConfirm(e.target.value);
  };

  const DeleteHandle = async () => {
    if (confirm !== CONFIRM_WORD) {
      return setError(true);
    }
    await toast.promise(() => mutateAsync({ id }), {
      pending: "المرجو الانتظار",
      success: "تم الحذف بنجاح",
      error: "حدث خطأ",
    });

    // this line after the post is deleted
    router.push("/");
  };

  return (
    <Modal isGlobal={false} localOnClose={() => setIsOpen(false)}>
      <BlockUi isBlock={isPending}>
        <div className="flex flex-col items-center gap-3">
          <h1>
            please confirm that you want to delete this post by typing{" "}
            {CONFIRM_WORD}
          </h1>
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
              <span className="text-red-700">please enter {CONFIRM_WORD}</span>
            }
          />
          <button
            onClick={DeleteHandle}
            className="w-full button_primary"
            disabled={isPending}
          >
            Delete
          </button>
        </div>
      </BlockUi>
    </Modal>
  );
}

export default DeletePostModal;
