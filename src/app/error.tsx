"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <div className="mx-auto flex flex-col items-center gap-1">
      <h1 className="my-5 text-center text-2xl text-red-700">
        حصلت مشكلة غير معروفة
      </h1>
      <Button onClick={() => window.location.reload()}>اعادة المحاولة</Button>
    </div>
  );
}
