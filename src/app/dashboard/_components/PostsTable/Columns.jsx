"use client";

import TableActions from "@/app/dashboard/_components/TableActions";
import Image from "next/image";

export const columns = [
  {
    id: "id",
    accessorKey: "id",
    enableHiding: true,
  },
  {
    header: "الصورة",
    accessorKey: "cover",
    cell({ getValue }) {
      const url = getValue();
      return (
        <div className="w-[50px] h-[50px] relative">
          <Image
            src={url}
            alt="image"
            fill
            className="object-contain"
            placeholder="empty"
          />
        </div>
      );
    },
  },
  {
    id: "title",
    header: "العنوان",
    accessorKey: "title",
  },

  {
    id: "actions",
    header: "اجراءات الجدول",
    cell: ({ row, table }) => {
      const data = row.original;
      const meta = table.options.meta;
      const isLoading = meta?.paddingColumns?.includes(data.id) || false;
      return (
        <TableActions
          onDelete={() => meta.handleDelete(data.id)}
          onEdit={() => meta.handleEdit(data.id)}
        />
      );
    },
  },
];
