"use client";
import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";
import { buttonVariants } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { z } from "zod";
import { PageSchema } from "@/schema/schema";

type TablePaginationProps = {
  total: number;
  limit: number;
};

function TablePagination({ total, limit }: TablePaginationProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const onPageChange = (page: number) => {
    return startTransition(() => router.push(`?page=${page}`));
  };

  const pageCount = total ? Math.round(total / limit) || 1 : 0;
  const page = PageSchema.parse(searchParams.get("page")) - 1; // react-paginate starts from 0;

  const isEmptyPage = pageCount === 0 || page * limit + 1 > total;
  if (pageCount === 1 || isEmptyPage) return null;
  return (
    <div className="flex items-center justify-between py-2">
      <ReactPaginate
        initialPage={page}
        className="flex items-center justify-start gap-4"
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

export default TablePagination;
