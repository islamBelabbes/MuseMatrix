import IsAdmin from "@/components/IsAdmin";
import QuoteForm from "@/components/Quote/QuoteForm/QuoteForm";
import React from "react";

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
