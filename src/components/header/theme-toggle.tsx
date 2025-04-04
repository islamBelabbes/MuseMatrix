"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon
            className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all
              dark:scale-0 dark:-rotate-90"
          />
          <MoonIcon
            className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90
              transition-all dark:scale-100 dark:rotate-0"
          />
          <span className="sr-only">تبديل المظهر</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} dir="auto">
          المظهر الفاتح
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} dir="auto">
          المظر الداكن
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} dir="auto">
          تلقائي
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
