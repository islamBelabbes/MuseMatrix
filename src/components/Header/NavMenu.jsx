import Link from "next/link";
import { NAV_LINKS } from "@/constants/constants";
import { cn } from "@/lib/utils";

function NavMenu({ className = null, itemClassName }) {
  const isAdmin = true;

  const navLinks = NAV_LINKS.filter((item) => {
    if (item.onlyAdmin && !isAdmin) return false;
    if (item.requireAuth && true) return false;
    return true;
  });

  return (
    <ul className={className}>
      {navLinks.map((link) => (
        <li
          key={link.id}
          className={cn(
            "text-base font-medium leading-6 text-secondary/600 dark:text-[#F0F2F5]",
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
