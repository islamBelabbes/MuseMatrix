import React, { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { manipulateSearchParams } from "@/lib/utils";
import Conditional from "@/Components/Conditional";
import dynamic from "next/dynamic";

// Modals
const SideMenu = dynamic(() => import("@/Components/Header/SideMenu"));

const MODALS = {
  sidemenu: <SideMenu />,
};

// this will hold the modals that can be opened if they are in the url (ex : ?modal=MODAL NAME)
const ParamsOpenable = ["sidemenu"];

const modalContext = createContext(null);
export const useModal = () => {
  const context = useContext(modalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};

function ModalsProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null);
  const searchParams = useSearchParams();

  const openModal = (modal) => {
    if (ParamsOpenable.includes(modal)) {
      manipulateSearchParams([{ key: "modal", value: modal }], "set");
    }
    setActiveModal(modal);
  };

  const closeModals = () => {
    manipulateSearchParams([{ key: "modal" }], "delete");
    setActiveModal(null);
  };

  useEffect(() => {
    if (
      searchParams.get("modal") &&
      MODALS[searchParams.get("modal")] &&
      ParamsOpenable.includes(searchParams.get("modal"))
    ) {
      setActiveModal(searchParams.get("modal"));
    }
  }, []);

  const values = {
    openModal,
    closeModals,
    activeModal,
  };

  if (activeModal && !MODALS[activeModal]) {
    throw new Error(`No modal found for ${activeModal}`);
  }
  return (
    <modalContext.Provider value={values}>
      <AnimatePresence mode="wait">
        {/* the key here is for framer motion AnimatePresence */}
        <Conditional condition={MODALS[activeModal]} key={activeModal} />
      </AnimatePresence>
      {children}
    </modalContext.Provider>
  );
}

export default ModalsProvider;
