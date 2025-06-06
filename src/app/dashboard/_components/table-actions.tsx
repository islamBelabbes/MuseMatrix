"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteEntryMutation } from "@/lib/react-query/mutations";
import { safeAsync } from "@/lib/safe";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type TTableActionsProps = {
  updateRoute: string;
  deleteRoute: string;
};

function TableActions({ deleteRoute, updateRoute }: TTableActionsProps) {
  const router = useRouter();

  const mutation = useDeleteEntryMutation();

  const handleEdit = () => {
    router.push(updateRoute);
  };

  const handleDelete = async () => {
    if (confirm("are you sure?")) {
      const deleted = await safeAsync(mutation.mutateAsync(deleteRoute));
      if (!deleted.success) return toast.error("حصلت خطأ أثناء الحذف ");

      toast.success("تم الحذف بنجاح");
      return router.refresh();
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild disabled={mutation.isPending}>
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
            onClick={handleDelete}
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
