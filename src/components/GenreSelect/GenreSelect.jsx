import BlockUi from "@/components/BlockUi";
import React, { useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import useGenreSelect from "./useGenreSelect";

function GenreSelect({ genre, setGenre }) {
  const [lastUpdate, setLastUpdate] = useState(null);
  const { getOptions, handleCreate, isLoading, isOptionsLoading } =
    useGenreSelect({
      onCreateSuccess: () => setLastUpdate(new Date().getTime()),
      setGenre,
    });

  const isBlock = isLoading;
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
          isDisabled={isBlock || isOptionsLoading}
          isLoading={isBlock}
          onCreateOption={handleCreate}
          onChange={setGenre}
          loadOptions={getOptions}
          defaultOptions
          value={genre}
        />
      </BlockUi>
    </div>
  );
}

export default GenreSelect;
