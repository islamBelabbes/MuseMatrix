"use client";
import { ClipLoader } from "react-spinners";
function loading() {
  return (
    <div className="h-screen flex justify-center">
      <ClipLoader color="#36d7b7" />
    </div>
  );
}

export default loading;
