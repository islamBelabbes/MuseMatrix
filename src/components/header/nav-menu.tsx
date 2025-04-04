import Link from "next/link";
import { TNavMenu } from "@/types/types";

function NavMenu({ links }: { links: TNavMenu[] }) {
  return (
    <ul className="hidden justify-center gap-10 lg:flex">
      {links.map((link) => (
        <li
          key={link.href}
          className="text-secondary/600 text-base leading-6 font-medium
            dark:text-[#F0F2F5]"
        >
          <Link href={link.href}>{link.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default NavMenu;
