"use client";

import Image from "next/image";

import Actions from "../Actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthorAvatar from "@/components/AuthorAvatar";

export const columns = [
  {
    id: "id",
    accessorKey: "id",
    enableHiding: true,
  },
  {
    id: "author_avatar",
    header: "صورة صاحب المقولة",
    accessorKey: "author",
    accessorFn: (data) => data.author?.avatar,
    cell({ getValue }) {
      const url = getValue();
      return <AuthorAvatar image={url} size={50} />;
    },
  },
  {
    id: "author",
    header: "العنوان",
    accessorFn: (data) => data.author?.name,
  },
  {
    id: "quote",
    header: "الإقتباس",
    accessorKey: "quote",
    accessorFn: (data) => {
      if (data.quote.length > 50) {
        return data.quote.substring(0, 50) + "...";
      }
      return data.quote;
    },
  },

  {
    id: "actions",
    header: "اجراءات الجدول",
    cell: ({ row, table }) => {
      const data = row.original;
      const meta = table.options.meta;
      const isLoading = meta?.paddingColumns?.includes(data.id) || false;
      return (
        <Actions
          onDelete={() => meta.handleDelete(data.id)}
          onEdit={() => meta.handleEdit(data.id)}
        />
      );
    },
  },
];
