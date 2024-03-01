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

export function PostsTable({
  initialData,
  withPaginate = false,
  limit = 3,
  queryKey,
}) {
  const [paddingColumns, setPaddingColumns] = useState([]);

  const [isMounted, setIsMounted] = useState(false);

  const [page, setPage] = useState(0);

  //   const { data, isPlaceholderData, isLoading } = useQuery({
  //     queryKey: [queryKey, page],
  //     queryFn: () =>
  //       fetchCategoriesTableData({
  //         index: page,
  //         limit: limit,
  //       }),
  //     placeholderData: (prevData) => {
  //       return keepPreviousData(prevData ? prevData : initialData);
  //     },
  //   });

  //   const tableMeta = {
  //     handleDelete: (id) => {
  //       return setDeleteModal({ isOpen: true, targetId: id });
  //     },
  //     paddingColumns,
  //   };

  const tableData = initialData;

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      columnVisibility: { id: false },
    },
    // meta: tableMeta,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //   if (isLoading)
  //     return (
  //       <div className="flex justify-center">
  //         <ClipLoader />
  //       </div>
  //     );

  return (
    <div>
      {/* <DeleteModal
        isOpen={deleteModal.isOpen}
        setIsOpen={(open) =>
          setDeleteModal((prev) => {
            return { ...prev, isOpen: open };
          })
        }
        onDelete={onDelete}
      /> */}
      <Table className="relative border rounded-md">
        {/* {isMounted && isPlaceholderData && (
          <div className="right-8 absolute top-[10px]">
            <ClipLoader size={24} />
          </div>
        )} */}

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
      {/* {withPaginate && (
        <ReactPaginate
          className="flex items-center justify-end gap-4 py-2"
          nextLinkClassName={buttonVariants({ variant: "default" })}
          previousLinkClassName={buttonVariants({ variant: "default" })}
          activeClassName="text-secondary"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={(param) => setPage(param.selected)}
          pageRangeDisplayed={5}
          pageCount={Math.round(tableData.total / limit)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          disabledClassName="cursor-not-allowed opacity-40"
        />
      )} */}
    </div>
  );
}
