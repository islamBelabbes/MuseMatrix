"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { forwardRef, useState } from "react";
import { CommandLoading } from "cmdk";

export type TSelectData = {
  label: string | undefined;
  value: string | undefined;
};

type TCreatableSelectProps = {
  data: TSelectData[];
  value: TSelectData;
  onChange: (selected: TSelectData) => void;
  search: string;
  setSearch: (search: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onCreate?: (search: string, setOpen: (open: boolean) => void) => void;
};

const CreatableSelect = forwardRef<HTMLButtonElement, TCreatableSelectProps>(
  (
    {
      data,
      onChange,
      search,
      setSearch,
      value,
      disabled,
      isLoading,
      onCreate,
      placeholder,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const resetValue = () => {
      return onChange({
        label: undefined,
        value: undefined,
      });
    };

    const handleOnSelect = (selectedValue: string, item: TSelectData) => {
      if (selectedValue === value.value) {
        resetValue();
      } else {
        onChange({
          label: item.label,
          value: item.value,
        });
      }

      return onOpenChange(false);
    };

    const onOpenChange = (open: boolean) => {
      setSearch("");
      setOpen(open);
    };

    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild ref={ref}>
          {/* Select Trigger */}
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="my-0! w-full justify-between px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            {value.label ? (
              value.label
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <CommandDialog open={open} onOpenChange={onOpenChange}>
          <CommandInput
            placeholder={placeholder}
            className="outline-0"
            onValueChange={setSearch}
          />
          <CommandList>
            {!data.length && !isLoading && Boolean(search) && onCreate && (
              <CommandItem
                className="cursor-pointer"
                onSelect={() => onCreate?.(search, onOpenChange)}
              >
                انشاء: {search}
              </CommandItem>
            )}

            {isLoading && (
              <CommandLoading className="py-2 text-center">
                جاري التحميل...
              </CommandLoading>
            )}

            {/* Search Result */}
            {!isLoading &&
              data.map((item) => (
                <CommandItem
                  className="flex cursor-pointer justify-between"
                  key={item.value}
                  value={item.value}
                  onSelect={(selected) => {
                    return handleOnSelect(selected, item);
                  }}
                >
                  {item.label}

                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
          </CommandList>
        </CommandDialog>
      </Popover>
    );
  },
);

export default CreatableSelect;
