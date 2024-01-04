import BlockUi from "@/components/BlockUi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import AuthorCreationModal from "./AuthorCreationModal";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";

function AuthorSelect({ author, setAuthor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [authorName, setAuthorName] = useState(null);

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
    setIsOpen(true);
    setAuthorName(inputValue);
  };

  const isBlock = isPending;

  return (
    <div className="flex items-center w-full gap-2">
      {/* using normal conditional rendering for animatePresence */}
      <AnimatePresence>
        {isOpen && (
          <AuthorCreationModal
            mutate={handleCreate}
            authorName={authorName}
            closeModal={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

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
        <AsyncCreatableSelect
          placeholder="اختيار او بحث"
          id="author"
          className="flex-1 font-bold dark:bg-transparent"
          classNames={{
            menu: () => "!z-20",
          }}
          isClearable
          isDisabled={isBlock}
          isLoading={isBlock}
          onCreateOption={handleOnCreate}
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
