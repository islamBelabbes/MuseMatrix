import React, { forwardRef, useState } from "react";
import CreatableSelect, { TSelectData } from "./creatable-select";
import useSearch from "@/hooks/use-search";
import { useGenresQuery } from "@/lib/react-query/queries";
import ErrorFullBack from "@/components/error-fullback";
import { TGenre } from "@/dto/genres";
import { useCreateGenreMutation } from "@/lib/react-query/mutations";
import { TCreateGenre } from "@/schema/genre";
import toast from "react-hot-toast";
import { safeAsync } from "@/lib/safe";
import { TDataWithPagination } from "@/types/types";

type TGenreSelectProps = {
  value: TSelectData;
  onChange: (value: TSelectData, genre?: TGenre) => void;
};

const GenreSelect = forwardRef<HTMLButtonElement, TGenreSelectProps>(
  ({ onChange, value }, ref) => {
    const { search, setSearch, debouncedSearch } = useSearch();

    const { data, isLoading, error, refetch } = useGenresQuery({
      title: debouncedSearch,
    });

    const mutation = useCreateGenreMutation();

    const refinedData = data
      ? data.data.map((item) => ({
          label: item.title,
          value: item.id.toString(),
        }))
      : [];

    const handleOnChange = (
      selected: TSelectData,
      data: TDataWithPagination<TGenre[]> | undefined,
    ) => {
      const selectedGenre = data?.data.find(
        (item) => String(item.id) === selected.value,
      );
      return onChange(selected, selectedGenre);
    };

    const handleOnCreate = async ({ title }: TCreateGenre) => {
      const res = await safeAsync(mutation.mutateAsync({ title }));
      if (!res.success) return toast.error("تعذر إنشاء التصنيف");
      const genre = res.data;

      const data = await refetch();

      handleOnChange(
        { label: genre.title, value: String(genre.id) },
        data.data,
      );
      toast.success("تصنيف جديد تم انشاءه بنجاح");
    };

    if (error) return <ErrorFullBack onRetry={refetch} />;
    return (
      <CreatableSelect
        placeholder="اختر تصنيف"
        data={refinedData}
        value={value}
        onChange={(selected) => {
          handleOnChange(selected, data);
        }}
        search={search}
        setSearch={setSearch}
        isLoading={isLoading || mutation.isPending}
        disabled={isLoading || mutation.isPending}
        onCreate={(search, setOpen) => {
          setOpen(false);
          return handleOnCreate({ title: search });
        }}
        ref={ref}
      />
    );
  },
);

export default GenreSelect;
