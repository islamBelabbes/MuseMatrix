import React, { useState } from "react";
import CreatableSelect, { TSelectData } from "./creatable-select";
import useSearch from "@/hooks/use-search";
import { useGenresQuery } from "@/lib/react-query/queries";
import ErrorFullBack from "@/components/error-fullback";

type TGenreSelectProps = {
  value: TSelectData;
  onChange: (value: TSelectData) => void;
};

function GenreSelect() {
  const [value, setValue] = useState({
    value: "",
    label: "",
  });

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

  if (error) return <ErrorFullBack onRetry={refetch} />;
  return (
    <CreatableSelect
      placeholder="اختر تصنيف"
      data={refinedData}
      value={value}
      onChange={(v) => {
        setValue(v);
        console.log(v);
      }}
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
