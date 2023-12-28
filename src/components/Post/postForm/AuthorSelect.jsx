import BlockUi from "@/components/BlockUi";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import AuthorCreationModal from "./AuthorCreationModal";
import Conditional from "@/components/Conditional";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
const optionsX = [
  { value: "1", label: "Chocolate" },
  { value: "2", label: "Strawberry" },
  { value: "3", label: "Vanilla" },
];

function AuthorSelect({ state, dispatch }) {
  const [modal, setModal] = useState({ isOpen: false, state: null });
  const {
    isLoading,
    data: authors,
    refetch,
  } = useQuery({
    queryKey: ["authors"],
    queryFn: () => axios.get("/api/author"),
    refetchOnWindowFocus: false,
  });

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
    await refetch();
    dispatch({
      type: "AUTHOR",
      payload: { value: data.data.id, label: data.data.name },
    });
  };

  const handleOnCreate = (inputValue) => {
    setModal({ state: inputValue, isOpen: true });
  };
  const isBlock = isPending || isLoading;

  return (
    <div className="flex items-center gap-2">
      <Conditional
        condition={modal.isOpen}
        onTrue={
          <AuthorCreationModal
            mutate={handleCreate}
            modal={modal}
            setModal={setModal}
          />
        }
      />

      <label
        htmlFor="author"
        className="whitespace-nowrap min-w-[60px] w-[60px]"
      >
        المصدر :
      </label>
      <BlockUi
        isBlock={isBlock}
        className={{ container: "w-full", spinner: "rounded" }}
      >
        <CreatableSelect
          placeholder="اختيار"
          id="author"
          className="flex-1 font-bold dark:bg-transparent"
          classNames={{
            menu: () => "!z-20",
          }}
          isClearable
          isDisabled={isBlock}
          isLoading={isBlock}
          onCreateOption={handleOnCreate}
          onChange={(e) => dispatch({ type: "AUTHOR", payload: e })}
          options={
            authors?.data?.data?.map((item) => ({
              value: item.id,
              label: item.name,
            })) || []
          }
          defaultValue={state?.author}
          value={state?.author}
        />
      </BlockUi>
    </div>
  );
}

export default AuthorSelect;
