import React, { useState } from "react";
import CreatableSelect, { TSelectData } from "./creatable-select";
import { useAuthorsQuery } from "@/lib/react-query/queries";
import useSearch from "@/hooks/use-search";
import { TAuthor } from "@/dtos/authors";

type TAuthorSelectProps = {
  value: TSelectData;
  onChange: (value: TSelectData, author: TAuthor) => void;
};

function AuthorSelect({}) {
  const [value, setValue] = useState({
    value: "",
    label: "",
  });

  const { search, setSearch, debouncedSearch } = useSearch();

  const { data, isLoading } = useAuthorsQuery({ name: debouncedSearch });
  const refinedData = data
    ? data.data.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))
    : [];

  return (
    <CreatableSelect
      placeholder="اختر مؤلف"
      data={refinedData}
      value={value}
      onChange={(v) => {
        setValue(v);
        console.log(v);
      }}
      search={search}
      setSearch={setSearch}
      isLoading={isLoading}
      onCreate={(search, setOpen) => {
        return setOpen(false);
      }}
    />
  );
}

export default AuthorSelect;
