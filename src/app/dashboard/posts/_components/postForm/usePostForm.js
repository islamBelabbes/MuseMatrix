import { useCallback, useReducer } from "react";

import { useRouter } from "next13-progressbar";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

import { reducer } from "@/reducer/postFormReducer";
import "@/lib/FroalaEditor";
const usePostForm = ({ initializedData, richEditorArea, isUpdate, postId }) => {
  const router = useRouter();
  const [data, dispatch] = useReducer(reducer, initializedData);

  // TODO : add yup validation
  const richTextEditorInit = useCallback(() => {
    return new FroalaEditor(`#${richEditorArea}`, {
      toolbarInline: true,
      charCounterCount: false,
      direction: "rtl",
      colorsText: ["#000000"],
      placeholderText: "ابدا بالكتابة",
      fontSize: ["14", , "16", "18", "20"],
      toolbarButtons: [
        "bold",
        "italic",
        "underline",
        "fontFamily",
        "fontSize",
        "color",
        "inlineStyle",
        "paragraphStyle",
        "paragraphFormat",
        "align",
        "quote",
        "undo",
        "redo",
      ],
      fontSizeDefaultSelection: 18,
      events: {
        initialized: function () {
          // Set the local data to the editor
          this.html.set(data?.content);
        },
        keyup: function () {
          dispatch({ type: "CONTENT", payload: this.html.get() });
        },
        contentChanged: async function () {
          // dispatch({ type: "CONTENT", payload: this.html.get() });
          if (!isUpdate || !postId || !this.html.get()) return;
          return axios.put("/api/posts", {
            id: postId,
            content: this.html.get(),
          });
        },
      },
    });
  }, [postId, isUpdate, data?.content, richEditorArea]);

  const { mutateAsync: mutateAsyncCreate, isPending: isLoadingCreate } =
    useMutation({
      mutationFn: (newPost) => {
        return axios.post("/api/posts", newPost);
      },
    });

  const { mutateAsync: mutateAsyncUpdate, isPending: isLoadingUpdate } =
    useMutation({
      mutationFn: (data) => {
        return axios.put("/api/posts", data);
      },
    });

  const mutateCreate = async () => {
    const { data: mutateData } = await toast.promise(
      () =>
        mutateAsyncCreate({
          ...data,
          genre: data.genre.value,
          author: data.author.value,
          status: data.status.value,
        }),
      {
        pending: "الرجاء الانتظار",
        success: "تم انشاء التصنيف بنجاح 👌",
        error: "حدث خطأ",
      },
      {
        toastId: "createToast",
      }
    );
    if (Boolean(mutateData.success) !== true) return;
    router.push(`/post/${mutateData.data.id}`);
  };

  const mutateUpdate = async () => {
    if (!postId) return;
    const { data: mutateData } = await toast.promise(
      () =>
        mutateAsyncUpdate({
          ...data,
          genre: data.genre.value,
          author: data.author.value,
          id: postId,
          status: data.status.value,
        }),
      {
        pending: "الرجاء الانتظار",
        success: "تم تعديل المقال بنجاح 👌",
        error: "حدث خطأ",
      },
      {
        toastId: "updateToast",
      }
    );
    if (Boolean(mutateData.success) !== true) return;
  };

  const isMutatingLoading = isLoadingCreate || isLoadingUpdate;
  const mutate = isUpdate ? mutateUpdate : mutateCreate;

  return [richTextEditorInit, data, dispatch, mutate, isMutatingLoading];
};
export default usePostForm;
