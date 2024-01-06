import BlockUi from "@/components/BlockUi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import { toast } from "react-toastify";

function GenreSelect({ genre, setGenre }) {
  const [lastUpdate, setLastUpdate] = useState(null);
  const getOptions = async (inputValue) => {
    const response = await axios.get(`/api/genres?genre=${inputValue}`);
    return response.data.data.map((item) => {
      return { value: item.id, label: item.title };
    });
  };

  const { mutateAsync, isPending } = useMutation({
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
    setLastUpdate(new Date().getTime());
    setGenre({ value: data.data.id, label: data.data.title });
  };

  const isBlock = isPending;
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="genre" className="whitespace-nowrap w-[60px]">
        التصنيف :
      </label>
      <BlockUi
        isBlock={isBlock}
        classNames={{ container: "w-full", spinner: "rounded" }}
      >
        <AsyncCreatableSelect
          key={lastUpdate}
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
          onChange={(e) => setGenre(e)}
          loadOptions={getOptions}
          defaultOptions
          value={genre}
        />
      </BlockUi>
    </div>
  );
}

export default GenreSelect;
