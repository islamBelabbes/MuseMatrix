"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { ClipLoader } from "react-spinners";

function Actions({ onDelete, onEdit }) {
  return (
    <div className="flex items-center justify-between w-full">
      <DropdownMenu modal>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">فتح</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="text-right">
          <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
          <DropdownMenuItem
            className="justify-end cursor-pointer"
            onClick={onEdit}
          >
            تعديل
          </DropdownMenuItem>
          <DropdownMenuItem
            className="justify-end cursor-pointer"
            onClick={onDelete}
          >
            حذف
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <ClipLoader size={14} /> */}
    </div>
  );
}

export default Actions;
