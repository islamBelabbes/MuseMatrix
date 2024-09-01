"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Image from "next/image";
import TablePagination from "../../_components/table-pagination";
import { TPost } from "@/dtos/posts";
import { TDataWithPagination } from "@/types/types";

const COLS = [
  {
    name: "الصورة",
  },
  {
    name: "العنوان",
  },
];

type PostTableProps = {
  posts: TDataWithPagination<TPost[]>;
  limit: number;
};


export default function PostsTable({ posts, limit }: PostTableProps) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {COLS.map((col) => (
              <TableHead key={col.name} className="text-right">
                {col.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.data.length > 0 ? (
            posts.data.map((post) => (
              <TableRow key={post.id}>
                <TableCell style={{ width: "100px" }}>
                  <div className="relative h-[50px] w-[50px]">
                    <Image
                      src={post.cover}
                      alt="image"
                      fill
                      className="object-contain"
                      placeholder="empty"
                    />
                  </div>
                </TableCell>
                <TableCell>{post.title}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={COLS.length} className="text-center">
                لايوجد مقالات لعرضها
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination limit={limit} total={posts.count} />
    </>
  );
}
