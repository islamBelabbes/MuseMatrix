import React from "react";

import IsAdmin from "@/components/IsAdmin";
import QuoteForm from "../_components/QuoteForm/QuoteForm";

function page() {
  return (
    <div className="app">
      <IsAdmin>
        <QuoteForm />
      </IsAdmin>
    </div>
  );
}

export default page;
