"use client";
import AuthorAvatar from "@/components/author-avatar";
import { DataTable } from "@/app/dashboard/_components/data-table";
import TablePagination from "@/app/dashboard/_components/table-pagination";
import { TQuote } from "@/dtos/quotes";
import { TDataWithPagination } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import TableActions from "../../_components/table-actions";

type TQuotesTable = Pick<TQuote, "author" | "quote">;

const columns: ColumnDef<TQuotesTable>[] = [
  {
    accessorKey: "author.cover",
    size: 200,
    header: "صورة صاحب المقولة",
    cell: ({ row }) => {
      const quote = row.original as TQuotesTable;
      return <AuthorAvatar avatar={quote.author.avatar} className="size-14" />;
    },
  },
  {
    accessorKey: "author.name",
    header: "صاحب المقولة",
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
    header: "الإجراءات",
    size: 100,
    cell: ({ row }) => {
      const { id } = row.original as TQuote;
      return (
        <TableActions
          editRoute={`/quotes/edit/${id}`}
          deleteRoute={`/quotes/delete`}
        />
      );
    },
  },
];

type TQuoteTableProps = {
  quotes: TDataWithPagination<TQuote[]>;
  limit: number;
};

function QuotesTable({ limit, quotes }: TQuoteTableProps) {
  console.log(quotes);

  return (
    <>
      <DataTable data={quotes.data} columns={columns} />
      <TablePagination limit={limit} total={quotes.count} />
    </>
  );
}

export default QuotesTable;