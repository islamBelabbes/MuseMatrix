"use client";
import { ClipLoader } from "react-spinners";
function loading() {
  return (
    <div className="flex justify-center h-screen">
      <ClipLoader color="#4B6BFB" />
    </div>
  );
}

export default loading;
