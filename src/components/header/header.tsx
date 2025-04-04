import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import NavMenu from "./nav-menu";
import SideMenu from "./side-menu";
import { getGenresUseCase } from "@/use-cases/genres";
import { TNavMenu } from "@/types/types";
import LogOut from "./logout";

const NAV_LINKS: TNavMenu[] = [
  {
    name: "الرئيسية",
    href: "/",
  },
  {
    name: "اقتباسات",
    href: "/quotes",
  },
];

async function Header() {
  const genres = await getGenresUseCase({ limit: 3 });
  const links = [
    ...NAV_LINKS,
    ...genres.data.map((genre) => ({
      name: genre.title,
      href: `/genre/${genre.id}`,
    })),
  ];
  return (
    <header
      className="sticky inset-0 z-20 min-h-[112px] w-full bg-white
        dark:bg-[#161513]"
    >
      <div className="app flex items-center justify-between">
        {/* Right */}
        <div className="flex items-center gap-x-8">
          {/* Menu Icon */}

          <SideMenu links={links} />
          {/* Logo */}
          <div className="w-full">
            <Link href={"/"} prefetch={false}>
              <h1 className="font-bold sm:text-2xl">Muse Matrix</h1>
            </Link>
          </div>

          {/* NavMenu */}
          <NavMenu links={links} />
        </div>

        {/* Left */}
        <div className="flex items-center gap-x-8">
          <LogOut />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
