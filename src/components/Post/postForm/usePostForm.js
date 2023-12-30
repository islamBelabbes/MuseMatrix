import { useReducer } from "react";
import "@/lib/FroalaEditor";
import { reducer } from "@/reducer/postFormReducer";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
const usePostForm = ({ initializedData, richEditorArea, type, postId }) => {
  const router = useRouter();
  const [data, dispatch] = useReducer(reducer, initializedData);

  // TODO : add yup validation
  const richTextEditorInit = () => {
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
          if (type !== "update" || !postId || !this.html.get()) return;
          return axios.put("/api/post", {
            id: postId,
            content: this.html.get(),
          });
        },
      },
    });
  };

  const { mutateAsync: mutateAsyncCreate, isPending: isLoadingCreate } =
    useMutation({
      mutationFn: (newPost) => {
        return axios.post("/api/post", newPost);
      },
    });

  const { mutateAsync: mutateAsyncUpdate, isPending: isLoadingUpdate } =
    useMutation({
      mutationFn: (data) => {
        return axios.put("/api/post", data);
      },
    });

  const mutateCreate = async () => {
    const { data: mutateData } = await toast.promise(
      () =>
        mutateAsyncCreate({
          ...data,
          genre: data.genre.value,
          author: data.author.value,
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
  const mutate = type === "create" ? mutateCreate : mutateUpdate;

  return [richTextEditorInit, data, dispatch, mutate, isMutatingLoading];
};
export default usePostForm;
