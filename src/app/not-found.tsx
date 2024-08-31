import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="mx-auto">
      <h1 className="my-5 text-center text-2xl">الصفحة المطلوبة غير موجودة</h1>
      <Link
        className={buttonVariants({ variant: "default", className: "w-full" })}
        href="/"
      >
        الصفحة الرئيسية
      </Link>
    </div>
  );
}

export default NotFound;
