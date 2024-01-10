"use client";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import DelateModal from "../Modal/DelateModal";
function DeleteQuoteModal({ id, closeModal }) {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id }) => axios.delete("/api/quotes", { data: { id } }),
  });

  const DelateHandler = async () => {
    await toast.promise(() => mutateAsync({ id }), {
      pending: "المرجو الانتظار",
      success: "تم الحذف بنجاح",
      error: "حدث خطأ",
    });

    // this line after the post is deleted
    router.push("/quotes");
  };

  return (
    <DelateModal
      onDelate={DelateHandler}
      confirmWord="Delete"
      onClickOutside={() => closeModal(false)}
      entry={"Please Type Delate in Order to Delate This Quote"}
      blockUi={isPending}
    />
  );
}

export default DeleteQuoteModal;
