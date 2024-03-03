"use client";
import React from "react";

import Quote from "./Quote";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
function ViewQuoteModal({ quote, onOpenChange }) {
  return (
    <Dialog open onOpenChange={onOpenChange} defaultOpen={false}>
      <DialogContent
        className="p-0 bg-transparent border-none sm:w-full"
        defaultClose={false}
      >
        <Quote quote={quote} isModal className={"mx-auto"}>
          {/* quote topBar */}
          <div className="absolute flex justify-between w-full px-2 top-3">
            <DialogClose asChild>
              <button className="button_primary ">{"عودة"}</button>
            </DialogClose>
          </div>
        </Quote>
      </DialogContent>
    </Dialog>
  );
}

export default ViewQuoteModal;
