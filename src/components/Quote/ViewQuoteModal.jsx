"use client";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Quote from "./Quote";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

function ViewQuoteModal({ quote, closeModal }) {
  const { user, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  if (!isLoaded) return;
  const isAdmin = user?.publicMetadata?.isAdmin;
  return (
    <Modal onClickOutside={closeModal}>
      <div className="p-5">
        <Quote quote={quote} isModal>
          {/* quote topBar */}
          <div className="absolute flex justify-between w-full px-2 top-3">
            <button onClick={closeModal} className="button_primary ">
              {"عودة"}
            </button>

            {isAdmin && (
              <div className="flex flex-wrap gap-1">
                <button
                  className="button_secondary "
                  onClick={() => setIsOpen(true)}
                >
                  حذف
                </button>
                <Link
                  className="button_secondary "
                  href={`quotes/update/${quote.id}`}
                >
                  تعديل
                </Link>
              </div>
            )}
          </div>
        </Quote>
      </div>
    </Modal>
  );
}

export default ViewQuoteModal;
