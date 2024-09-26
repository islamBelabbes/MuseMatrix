import React from "react";

import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { useEditor } from "novel";
import { cn } from "@/lib/utils";

const items = [
  {
    name: "left",
    icon: AlignLeft,
  },
  {
    name: "center",
    icon: AlignCenter,
  },
  {
    name: "right",
    icon: AlignRight,
  },
];

interface TextAlignSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function TextAlignSelector({ onOpenChange, open }: TextAlignSelectorProps) {
  const { editor } = useEditor();
  if (!editor) return null;

  const activeItem = items.find((item) =>
    editor.isActive({ textAlign: item.name }),
  );

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" className="gap-2 rounded-none" variant="ghost">
          {activeItem && <activeItem.icon />}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl"
        align="start"
      >
        <div className="flex flex-col">
          <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
            Text Align
          </div>
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                editor.chain().focus().setTextAlign(item.name).run();
                onOpenChange(false);
              }}
              className={cn(
                "flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent",
                {
                  "bg-accent": item.name === activeItem?.name,
                },
              )}
            >
              <div className="flex items-center gap-2">
                <item.icon />
                <span>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default TextAlignSelector;
