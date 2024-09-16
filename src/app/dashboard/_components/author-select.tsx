import React, { useState } from "react";
import CreatableSelect, { TSelectData } from "./creatable-select";
import { useAuthorsQuery } from "@/lib/react-query/queries";
import useSearch from "@/hooks/use-search";
import { TAuthor } from "@/dto/authors";
import ErrorFullBack from "@/components/error-fullback";
import CreateAuthorModal from "./create-author-modal";
import { TDataWithPagination } from "@/types/types";
import { useIsMutating } from "@tanstack/react-query";

type TAuthorSelectProps = {
  value: TSelectData;
  onChange: (value: TSelectData, author?: TAuthor) => void;
};

function AuthorSelect({ onChange, value }: TAuthorSelectProps) {
  const [authorName, setAuthorName] = useState<string>("");
  const { search, setSearch, debouncedSearch } = useSearch();
  const [isOpen, setOpen] = useState(true);

  const { data, error, refetch, ...query } = useAuthorsQuery({
    name: debouncedSearch,
  });
  const refinedData = data
    ? data.data.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))
    : [];

  const handleOnChange = (
    selected: TSelectData,
    data: TDataWithPagination<TAuthor[]> | undefined,
  ) => {
    const selectedAuthor = data?.data.find(
      (item) => String(item.id) === selected.value,
    );
    return onChange(selected, selectedAuthor);
  };

  const handleOnAuthorCreationSuccess = async (author: TAuthor) => {
    const data = await refetch();
    handleOnChange({ label: author.name, value: String(author.id) }, data.data);
  };

  if (error) return <ErrorFullBack onRetry={refetch} />;

  const isAuthorMutating = useIsMutating({
    mutationKey: ["create-author"],
  });
  const isLoading = query.isLoading || Boolean(isAuthorMutating);
  return (
    <>
      <CreatableSelect
        placeholder="اختر مؤلف"
        data={refinedData}
        value={value}
        onChange={(selected) => handleOnChange(selected, data)}
        search={search}
        setSearch={setSearch}
        isLoading={isLoading}
        disabled={isLoading}
        onCreate={(search) => {
          setAuthorName(search);
          return setOpen(true);
        }}
      />

      {authorName && (
        <CreateAuthorModal
          onOpenChange={setOpen}
          open={isOpen}
          authorName={authorName}
          onSuccess={handleOnAuthorCreationSuccess}
        />
      )}
    </>
  );
}

export default AuthorSelect;
