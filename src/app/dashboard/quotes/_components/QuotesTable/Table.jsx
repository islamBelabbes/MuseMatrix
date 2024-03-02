"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useRouter } from "next13-progressbar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./Columns";
import { getQuotes } from "@/lib/api";
import TablePagination from "@/app/dashboard/_components/TablePagination";
import DeleteQuoteModal from "../DeleteQuoteModal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function QuotesTable({ initialData, query, queryKey }) {
  const [isMounted, setIsMounted] = useState(false);

  const [page, setPage] = useState(1);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    targetId: null,
  });

  const router = useRouter();

  const { data, isPlaceholderData, error, refetch } = useQuery({
    queryKey: [queryKey, page],
    queryFn: () => getQuotes({ ...query, page }),
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
      router.push(`/dashboard/quotes/update/${id}`);
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
        <DeleteQuoteModal
          onOpenChange={(isOpen) => setDeleteModal({ isOpen, targetId: null })}
          id={deleteModal.targetId}
          onSuccess={() => {
            refetch();
            return setDeleteModal({ isOpen: false, targetId: null });
          }}
        />
      )}

      <Link
        href="/dashboard/quotes/create"
        className={cn(buttonVariants(), "w-full my-2")}
      >
        انشاء اقتباس
      </Link>

      <Table className="relative border rounded-md quotes_table">
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
        <TablePagination
          limit={query?.limit}
          onPageChange={setPage}
          total={tableData?.count}
        />
        {isMounted && isPlaceholderData && <ClipLoader size={24} />}
      </div>
    </div>
  );
}
