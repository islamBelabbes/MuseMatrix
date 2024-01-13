import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

function useGenreSelect({ onCreateSuccess, setGenre }) {
  const getOptions = async (inputValue) => {
    const response = await axios.get(`/api/genres?genre=${inputValue}`);
    return response.data.data.map((item) => {
      return { value: item.id, label: item.title };
    });
  };

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: (title) => axios.post("/api/genres", { title }),
    mutationKey: ["genre"],
  });

  const handleCreate = async (inputValue) => {
    const { data } = await toast.promise(() => mutateAsync(inputValue), {
      pending: "الرجاء الانتظار",
      success: "تم انشاء التصنيف بنجاح 👌",
      error: "حدث خطأ",
    });
    if (Boolean(data.success) !== true) return;
    setGenre({ value: data.data.id, label: data.data.title });

    onCreateSuccess && onCreateSuccess();
  };

  return { getOptions, handleCreate, isLoading };
}

export default useGenreSelect;
