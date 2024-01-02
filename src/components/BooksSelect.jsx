import BlockUi from "@/components/BlockUi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";

function AuthorSelect({ author, setAuthor }) {
  const getOptions = async (inputValue) => {
    const response = await axios.get(`/api/author?name=${inputValue}`);
    return response.data.data.map((item) => {
      return { value: item.id, label: item.name, avatar: item.avatar };
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ name, avatar }) => {
      return axios.post("/api/author", { name, avatar });
    },
    mutationKey: ["author"],
  });

  const isBlock = isPending;

  return (
    <div className="flex items-center w-full gap-2">
      <label
        htmlFor="author"
        className="whitespace-nowrap min-w-[60px] w-[60px]"
      >
        المصدر :
      </label>
      <BlockUi
        isBlock={isBlock}
        classNames={{ container: "w-full", spinner: "rounded" }}
      >
        <AsyncSelect
          placeholder="اختيار"
          id="author"
          className="flex-1 font-bold dark:bg-transparent"
          classNames={{
            menu: () => "!z-20",
          }}
          isClearable
          onChange={(e) => setAuthor(e)}
          loadOptions={getOptions}
          defaultOptions
          value={author}
        />
      </BlockUi>
    </div>
  );
}

export default AuthorSelect;
