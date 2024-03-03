"use client";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next13-progressbar";

import DeleteModal from "@/components/Modals/DeleteModal";
function DeletePostModal({ id, setIsOpen, onSuccess }) {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id }) => axios.delete("/api/posts", { data: { id } }),
  });

  const DeleteHandler = async () => {
    await toast.promise(() => mutateAsync({ id }), {
      pending: "المرجو الانتظار",
      success: "تم الحذف بنجاح",
      error: "حدث خطأ",
    });

    onSuccess && onSuccess();
  };

  return (
    <DeleteModal
      onDelete={DeleteHandler}
      confirmWord="Delete"
      onOpenChange={setIsOpen}
      entry={"Please Type Delete in Order to Delete This Post"}
      blockUi={isPending}
    />
  );
}

export default DeletePostModal;
