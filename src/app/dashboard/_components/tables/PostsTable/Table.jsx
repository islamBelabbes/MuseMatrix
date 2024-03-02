"use client";
import { useEffect, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { ClipLoader } from "react-spinners";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "./Columns";
import DeletePostModal from "@/app/dashboard/posts/_components/DeletePostModal";
import { getPosts } from "@/lib/api";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next13-progressbar";
import { toast } from "react-toastify";

export function PostsTable({ initialData, query, queryKey }) {
  const [isMounted, setIsMounted] = useState(false);

  const [page, setPage] = useState(1);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    targetId: null,
  });

  const router = useRouter();

  const { data, isPlaceholderData, error } = useQuery({
    queryKey: [queryKey, page],
    queryFn: () => getPosts({ ...query, page }),
    placeholderData: (prevData) => {
      return keepPreviousData(prevData ? prevData : initialData);
    },
    retry: 3,
  });

  const tableMeta = {
    handleDelete: (id) => {
      return setDeleteModal({ isOpen: true, targetId: id });
    },
    handleEdit: (id) => {
      router.push(`/dashboard/posts/update/${id}`);
    },
  };

  const tableData = data ? data : initialData;

  const table = useReactTable({
    data: tableData.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnVisibility: { id: false },
    },
    meta: tableMeta,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (error) toast.error("حدث خطأ ما", { toastId: "post_error" });
  }, [error]);

  return (
    <div>
      {deleteModal.isOpen && (
        <DeletePostModal
          setIsOpen={(isOpen) => setDeleteModal({ isOpen })}
          id={deleteModal.targetId}
          onSuccess={() => setDeleteModal({ isOpen: false, targetId: null })}
        />
      )}

      <Table className="relative border rounded-md posts_table">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="text-right" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel()?.rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cell.id.replace("0_", "")}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center gap-3">
        <ReactPaginate
          className="flex items-center justify-start gap-4 py-2"
          nextLinkClassName={buttonVariants({ variant: "default" })}
          previousLinkClassName={buttonVariants({ variant: "default" })}
          activeClassName="text-primary"
          breakLabel="..."
          nextLabel="التالي"
          onPageChange={(param) => setPage(param.selected + 1)}
          pageRangeDisplayed={5}
          pageCount={Math.round(tableData.count / query?.limit || 1)}
          previousLabel="السابق"
          renderOnZeroPageCount={null}
          disabledClassName="cursor-not-allowed opacity-50"
        />
        {isMounted && isPlaceholderData && <ClipLoader size={24} />}
      </div>
    </div>
  );
}
