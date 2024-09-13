import React, { useState } from "react";
import CreatableSelect, { TSelectData } from "./creatable-select";
import useSearch from "@/hooks/use-search";
import { useGenresQuery } from "@/lib/react-query/queries";
import ErrorFullBack from "@/components/error-fullback";
import { TGenre } from "@/dtos/geners";

type TGenreSelectProps = {
  value: TSelectData;
  onChange: (value: TSelectData, genre?: TGenre) => void;
};

function GenreSelect({ onChange, value }: TGenreSelectProps) {
  const { search, setSearch, debouncedSearch } = useSearch();

  const { data, isLoading, error, refetch } = useGenresQuery({
    title: debouncedSearch,
  });
  const refinedData = data
    ? data.data.map((item) => ({
        label: item.title,
        value: item.id.toString(),
      }))
    : [];

  const handleOnChange = (selected: TSelectData) => {
    const selectedGenre = data?.data.find(
      (item) => String(item.id) === selected.value,
    );
    return onChange(selected, selectedGenre);
  };

  if (error) return <ErrorFullBack onRetry={refetch} />;
  return (
    <CreatableSelect
      placeholder="اختر تصنيف"
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

export default GenreSelect;
