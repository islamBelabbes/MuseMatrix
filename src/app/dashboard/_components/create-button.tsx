import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function CreateButton({
  children,
  href = "#",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: "default",
        className: "mb-1 w-full",
      })}
    >
      {children}
    </Link>
  );
}

export default CreateButton;
