import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function useAuthorSelect({ setAuthor, onCreate }) {
  const [authorName, setAuthorName] = useState(null);

  const getOptions = async (inputValue) => {
    const response = await axios.get(`/api/authors?name=${inputValue}`);
    return response.data.data.map((item) => {
      return { value: item.id, label: item.name, avatar: item.avatar };
    });
  };

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: ({ name, avatar }) => {
      return axios.post("/api/authors", { name, avatar });
    },
    mutationKey: ["author"],
  });

  const handleCreate = async ({ name, avatar }) => {
    const { data } = await toast.promise(() => mutateAsync({ name, avatar }), {
      pending: "الرجاء الانتظار",
      success: "تم انشاء المصدر بنجاح 👌",
      error: "حدث خطأ",
    });
    if (Boolean(data.success) !== true) return;
    setAuthor({
      value: data.data.id,
      label: data.data.name,
      avatar: data.data.avatar,
    });
  };

  const handleOnCreate = (inputValue) => {
    setAuthorName(inputValue);
    onCreate && onCreate();
  };

  return {
    getOptions,
    handleCreate,
    handleOnCreate,
    isLoading,
    authorName,
  };
}

export default useAuthorSelect;
