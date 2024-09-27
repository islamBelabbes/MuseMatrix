"use client";
import { useState } from "react";
import Link from "next/link";

import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "./theme-toggle";
import { TNavMenu } from "@/types/types";
import { useRouter } from "next-nprogress-bar";

function SideMenu({ links }: { links: TNavMenu[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const anchorElement = e.target as HTMLAnchorElement;
    router.push(anchorElement.href);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent className="w-full border-none md:w-[30%]">
        <ul className="mt-[10px] flex flex-col gap-2 md:mt-0">
          {links.map((link) => (
            <li
              key={link.href}
              className={`text-secondary/600 w-full border-b p-3 text-base font-medium leading-6`}
            >
              <Link href={link.href} onClick={(e) => handleOnClick(e)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-[10px] flex items-center justify-between">
          <span dir="ltr">: تغير الوضع</span>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SideMenu;
