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
import { useRouter } from "next/navigation";

type TTableActionsProps = {
  updateRoute: string;
  deleteRoute: string;
};

function TableActions({ deleteRoute, updateRoute }: TTableActionsProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(updateRoute);
  };
  return (
    <div className="flex w-full items-center justify-between">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">فتح</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="text-right">
          <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer justify-end"
            onClick={handleEdit}
          >
            تعديل
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer justify-end"
            // onClick={onDelete}
          >
            حذف
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <ClipLoader size={14} /> */}
    </div>
  );
}

export default TableActions;
