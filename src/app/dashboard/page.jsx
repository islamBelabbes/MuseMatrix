import { UserButton } from "@clerk/nextjs";
import React from "react";

import { ClipLoader } from "react-spinners";

function page() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-3">
      <h1 dir="ltr" className="text-lg font-semibold">
        Welcome Back...
      </h1>
      <UserButton />
    </div>
  );
}

export default page;
