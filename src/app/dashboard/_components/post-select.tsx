import React, { useState } from "react";
import CreatableSelect, { TSelectData } from "./creatable-select";
import { TPost } from "@/dtos/posts";
import { usePostsQuery } from "@/lib/react-query/queries";
import useSearch from "@/hooks/use-search";
import ErrorFullBack from "@/components/error-fullback";

type TPostSelectProps = {
  value: TSelectData;
  onChange: (value: TSelectData, post: TPost) => void;
};

function PostSelect() {
  const [value, setValue] = useState({
    value: "",
    label: "",
  });

  const { search, setSearch, debouncedSearch } = useSearch();

  const { data, isLoading, error, refetch } = usePostsQuery({
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
      placeholder="اختر مقالة"
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

export default PostSelect;
