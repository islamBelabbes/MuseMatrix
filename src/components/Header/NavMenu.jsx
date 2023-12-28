import Link from "next/link";
import { NAV_LINKS } from "@/constants/constants";
import { twMerge } from "tailwind-merge";

function NavMenu({ className = null, itemClassName }) {
  return (
    <ul className={className}>
      {NAV_LINKS.map((link) => (
        <li
          key={link.id}
          className={twMerge(
            "text-base font-medium leading-6 text-Secondary/600 dark:text-[#F0F2F5]",
            itemClassName
          )}
        >
          <Link href={link.href} prefetch={false}>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavMenu;
