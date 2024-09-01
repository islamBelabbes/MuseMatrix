"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NAVBAR_LINKS = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Posts",
    path: "/dashboard/posts",
  },
  {
    name: "Drafts",
    path: "/dashboard/drafts",
  },
  {
    name: "Quotes",
    path: "/dashboard/quotes",
  },
];
function NavBar() {
  const path = usePathname();

  return (
    <div className="w-full border-b border-gray-300 pb-3">
      <ul className="flex items-center justify-center gap-3">
        {NAVBAR_LINKS.map((link) => (
          <li key={link.name}>
            <Link
              href={link.path}
              className={cn("font-bold", {
                "text-primary": path === link.path,
              })}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavBar;
