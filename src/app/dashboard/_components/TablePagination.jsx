import { buttonVariants } from "@/components/ui/button";
import React from "react";
import ReactPaginate from "react-paginate";

function TablePagination({ onPageChange, total, limit }) {
  return (
    <ReactPaginate
      className="flex items-center justify-start gap-4 py-2"
      nextLinkClassName={buttonVariants({ variant: "default" })}
      previousLinkClassName={buttonVariants({ variant: "default" })}
      activeClassName="text-primary"
      breakLabel="..."
      nextLabel="التالي"
      onPageChange={(param) => onPageChange(param.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={Math.round(total / limit || 0)}
      previousLabel="السابق"
      renderOnZeroPageCount={false}
      disabledClassName="cursor-not-allowed opacity-50"
    />
  );
}

export default TablePagination;
