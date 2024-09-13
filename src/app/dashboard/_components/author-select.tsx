import React, { useState } from "react";
import CreatableSelect, { TSelectData } from "./creatable-select";
import { useAuthorsQuery } from "@/lib/react-query/queries";
import useSearch from "@/hooks/use-search";
import { TAuthor } from "@/dto/authors";
import ErrorFullBack from "@/components/error-fullback";

type TAuthorSelectProps = {
  value: TSelectData;
  onChange: (value: TSelectData, author?: TAuthor) => void;
};

function AuthorSelect({ onChange, value }: TAuthorSelectProps) {
  const { search, setSearch, debouncedSearch } = useSearch();

  const { data, isLoading, error, refetch } = useAuthorsQuery({
    name: debouncedSearch,
  });
  const refinedData = data
    ? data.data.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))
    : [];

  const handleOnChange = (selected: TSelectData) => {
    const selectedAuthor = data?.data.find(
      (item) => String(item.id) === selected.value,
    );
    return onChange(selected, selectedAuthor);
  };

  if (error) return <ErrorFullBack onRetry={refetch} />;
  return (
    <CreatableSelect
      placeholder="اختر مؤلف"
      data={refinedData}
      value={value}
      onChange={handleOnChange}
      search={search}
      setSearch={setSearch}
      isLoading={isLoading}
      disabled={isLoading}
      onCreate={(search, setOpen) => {
        return setOpen(false);
      }}
    />
  );
}

export default AuthorSelect;
