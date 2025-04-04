"use client";
import Image from "next/image";
import { TPost } from "@/dto/posts";
import { TDataWithPagination } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/app/dashboard/_components/data-table";
import TableActions from "./table-actions";
import { MEDIA_URL } from "@/lib/constants";

type TPostTable = Pick<TPost, "title" | "cover" | "id">;

const columns: ColumnDef<TPostTable>[] = [
  {
    accessorKey: "cover",
    size: 100,
    header: "الصورة",
    cell: ({ row }) => {
      const post = row.original;
      return (
        <div className="relative h-[50px] w-[50px]">
          <Image
            src={`${MEDIA_URL}/${post.cover}`}
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
    accessorKey: "title",
    header: "العنوان",
  },
  {
    id: "actions",
    header: "الإجراءات",
    size: 100,
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <TableActions
          updateRoute={`posts/update/${id}`}
          deleteRoute={`posts/${id}`}
        />
      );
    },
  },
];

type TPostTableProps = {
  posts: TDataWithPagination<TPost[]>;
  limit: number;
};

export default function PostsTable({ posts, limit }: TPostTableProps) {
  return (
    <DataTable
      data={posts.data}
      columns={columns}
      limit={limit}
      total={posts.total}
      withPagination
    />
  );
}
