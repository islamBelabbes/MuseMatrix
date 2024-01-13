import BlockUi from "@/components/BlockUi";
import { useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import AuthorCreationModal from "./AuthorCreationModal";
import { AnimatePresence } from "framer-motion";
import useAuthorSelect from "./useAuthorSelect";

function AuthorSelect({ author, setAuthor }) {
  const [isOpen, setIsOpen] = useState(false);
  const { getOptions, handleCreate, handleOnCreate, isLoading, authorName } =
    useAuthorSelect({
      setAuthor,
      onCreate: () => setIsOpen(true),
    });

  const isBlock = isLoading;
  return (
    <div className="flex items-center w-full gap-2">
      <AnimatePresence>
        {isOpen && (
          <AuthorCreationModal
            mutate={handleCreate}
            authorName={authorName}
            closeModal={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <BlockUi
        isBlock={isBlock}
        classNames={{
          container: "w-full flex gap-2 items-center",
          spinner: "rounded",
        }}
      >
        <label
          htmlFor="author"
          className="whitespace-nowrap min-w-[60px] w-[60px]"
        >
          المصدر :
        </label>
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
        />
      </BlockUi>
    </div>
  );
}

export default AuthorSelect;
