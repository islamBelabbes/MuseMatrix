"use client";
import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { PageSchema } from "@/schema/schema";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ReactPaginate from "react-paginate";

type TTableData<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

type TDataTableWithPagination<TData, TValue> = TTableData<TData, TValue> & {
  withPagination: true;
  total: number;
  limit: number;
};

type TDataTableWithoutPagination<TData, TValue> = TTableData<TData, TValue> & {
  withPagination?: false;
};

type DataTableProps<TData, TValue> =
  | TDataTableWithoutPagination<TData, TValue>
  | TDataTableWithPagination<TData, TValue>;

type TablePaginationProps = {
  total: number;
  limit: number;
};

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const { columns, data } = props;
  const table = useReactTable({
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-right">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      width:
                        cell.column.getSize() === 0
                          ? undefined
                          : cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                لايوجد نتائج لعرضها
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {props.withPagination && (
        <TablePagination limit={props.limit} total={props.total} />
      )}
    </div>
  );
}

function TablePagination({ total, limit }: TablePaginationProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const onPageChange = (nextPage: number) => {
    return startTransition(() => router.push(`?page=${nextPage}`));
  };

  const pageCount = total ? Math.ceil(total / limit) : 0;

  const page = PageSchema.parse(searchParams.get("page"));

  if (pageCount === 1) return null;
  return (
    <div className="flex items-center justify-between py-2">
      <ReactPaginate
        initialPage={page - 1} // react-paginate starts from 0;
        className="flex items-center justify-start gap-4 select-none"
        nextLinkClassName={buttonVariants({ variant: "default" })}
        previousLinkClassName={buttonVariants({ variant: "default" })}
        activeClassName="text-primary"
        breakLabel="..."
        nextLabel="التالي"
        onPageChange={(param) => onPageChange(param.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="السابق"
        renderOnZeroPageCount={null}
        disabledClassName="cursor-not-allowed opacity-50"
      />

      {isPending && <Spinner className="size-6" />}
    </div>
  );
}
