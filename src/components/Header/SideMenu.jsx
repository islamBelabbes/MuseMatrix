"use client";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/constants";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useRouter } from "next13-progressbar";
import DarkModeButton from "./DarkModeButton";

function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleOnClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    router.push(e?.target?.href);
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent className="border-none w-full md:w-[30%]">
        <ul className="flex-col gap-2 flex md:mt-0 mt-[10px]">
          {NAV_LINKS.map((link) => (
            <li
              key={link.id}
              className={`border-b w-full p-3 text-base font-medium leading-6 text-secondary/600`}
            >
              <Link href={link.href} onClick={handleOnClick}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-[10px] flex justify-between items-center">
          <span dir="ltr">: تغير الوضع</span>
          <DarkModeButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SideMenu;
