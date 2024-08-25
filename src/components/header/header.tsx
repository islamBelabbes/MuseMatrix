import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import NavMenu from "./nav-menu";
import SideMenu from "./side-menu";

function Header() {
  return (
    <header className="sticky inset-0 z-20 min-h-[112px] w-full bg-white dark:bg-[#161513]">
      <div className="app flex items-center justify-between">
        {/* Right */}
        <div className="flex items-center gap-x-8">
          {/* Menu Icon */}

          <SideMenu />
          {/* Logo */}
          <div className="w-full">
            <Link href={"/"} prefetch={false}>
              <h1 className="font-bold sm:text-2xl">Muse Matrix</h1>
            </Link>
          </div>

          {/* NavMenu */}
          <NavMenu />
        </div>

        {/* Left */}
        <div className="flex items-center gap-x-8">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
