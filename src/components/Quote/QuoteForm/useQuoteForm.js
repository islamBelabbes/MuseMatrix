import { reducer } from "@/reducer/quoteReducer";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useReducer } from "react";
import { toast } from "react-toastify";

function useQuoteForm(initialData, isUpdate, quoteId) {
  const router = useRouter();
  const [data, dispatch] = useReducer(reducer, initialData);

  const { mutateAsync: mutateAsyncCreate, isPending: isCreatePending } =
    useMutation({
      mutationFn: (data) => axios.post("/api/quotes", data),
    });
  const { mutateAsync: mutateAsyncUpdate, isPending: isUpdatePending } =
    useMutation({
      mutationFn: (data) => axios.put("/api/quotes", data),
    });

  const createMutate = async (e) => {
    e.preventDefault();
    await toast.promise(
      () =>
        mutateAsyncCreate({
          authorId: data.author.value,
          postId: data.post.value,
          quote: data.quote,
          color: data.color,
        }),
      {
        pending: "المرجو الانتظار",
        success: "تم انشاء اقتباس بنجاح",
        error: "حدث خطأ",
      }
    );
    router.push(`/quotes`);
    router.refresh();
  };

  const updateMutate = async (e) => {
    e.preventDefault();
    if (!quoteId) return;
    await toast.promise(
      () =>
        mutateAsyncUpdate({
          id: quoteId,
          authorId: data.author.value,
          postId: data.post.value,
          quote: data.quote,
          color: data.color,
        }),
      {
        pending: "المرجو الانتظار",
        success: "تم تحديث الاقتباس بنجاح",
        error: "حدث خطأ",
      }
    );
  };

  const isLoading = isCreatePending || isUpdatePending;
  const mutate = isUpdate ? updateMutate : createMutate;

  return [data, dispatch, isLoading, mutate];
}

export default useQuoteForm;
