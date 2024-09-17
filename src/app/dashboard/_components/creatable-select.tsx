"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
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

function CreatableSelect({
  placeholder = "Select...",
  data,
  isLoading,
  disabled,
  onChange,
  value,
  search,
  setSearch,
  onCreate,
}: TCreatableSelectProps) {
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
      <PopoverTrigger asChild>
        {/* Select Trigger */}
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="!my-0 w-full justify-between px-3 py-2"
        >
          {value.label ? (
            value.label
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0" forceMount>
        <CommandDialog open={open} onOpenChange={onOpenChange}>
          <CommandInput
            placeholder={placeholder}
            className="outline-0"
            onValueChange={setSearch}
          />
          <CommandList>
            {!data.length && !isLoading && Boolean(search) && (
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
      </PopoverContent>
    </Popover>
  );
}

export default CreatableSelect;
