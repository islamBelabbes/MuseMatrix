import BlockUi from "@/components/BlockUi";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";

function GenreSelect({ state, dispatch }) {
  const {
    data: genres,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: () => axios.get("/api/genre"),
    refetchOnWindowFocus: false,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (title) => axios.post("/api/genre", { title }),
    mutationKey: ["genre"],
  });

  const handleCreate = async (inputValue) => {
    const { data } = await toast.promise(() => mutateAsync(inputValue), {
      pending: "الرجاء الانتظار",
      success: "تم انشاء التصنيف بنجاح 👌",
      error: "حدث خطأ",
    });
    if (Boolean(data.success) !== true) return;
    await refetch();
    dispatch({
      type: "GENRE",
      payload: { value: data.data.id, label: data.data.title },
    });
  };

  const isBlock = isPending || isLoading;
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="genre" className="whitespace-nowrap w-[60px]">
        التصنيف :
      </label>
      <BlockUi
        isBlock={isBlock}
        classNames={{ container: "w-full", spinner: "rounded" }}
      >
        <CreatableSelect
          placeholder="اختيار"
          id="genre"
          className="flex-1 font-bold dark:bg-transparent "
          classNames={{
            menu: () => "!z-20",
          }}
          isClearable
          isDisabled={isBlock}
          isLoading={isBlock}
          onCreateOption={handleCreate}
          onChange={(e) => dispatch({ type: "GENRE", payload: e })}
          options={
            genres?.data?.data?.map((item) => ({
              value: item.id,
              label: item.title,
            })) || []
          }
          defaultValue={state?.genre}
          value={state?.genre}
        />
      </BlockUi>
    </div>
  );
}

export default GenreSelect;
