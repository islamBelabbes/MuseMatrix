import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

function NavMenu() {
  return (
    <ul className="hidden justify-center gap-10 md:flex">
      {NAV_LINKS.map((link) => (
        <li
          key={link.id}
          className="text-secondary/600 text-base font-medium leading-6 dark:text-[#F0F2F5]"
        >
          <Link href={link.href}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default NavMenu;
