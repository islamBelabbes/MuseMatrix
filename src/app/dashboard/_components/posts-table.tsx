"use client";
import Image from "next/image";
import TablePagination from "./table-pagination";
import { TPost } from "@/dtos/posts";
import { TDataWithPagination } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/app/dashboard/_components/data-table";
import TableActions from "./table-actions";

type TPostTable = Pick<TPost, "title" | "cover">;

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
            src={post.cover}
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
      const { id } = row.original as TPost;
      return (
        <TableActions
          editRoute={`/quotes/edit/${id}`}
          deleteRoute={`/quotes/delete`}
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
    <>
      <DataTable data={posts.data} columns={columns} />
      <TablePagination limit={limit} total={posts.count} />
    </>
  );
}
