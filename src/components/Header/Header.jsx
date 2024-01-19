import Link from "next/link";
import DarkModeButton from "./DarkModeButton";
import NavMenu from "./NavMenu";
import OpenModalButton from "../Modal/OpenModalButton";
import { UserButton, currentUser } from "@clerk/nextjs";

async function Header() {
  const user = await currentUser();
  const isAdmin = user?.publicMetadata?.isAdmin;
  return (
    <header className="sticky z-20 bg-white dark:bg-[#161513] w-full inset-0">
      <div className="flex items-center justify-between app">
        {/* Right */}
        <div className="flex items-center gap-x-8">
          {/* Menu Icon */}
          <OpenModalButton
            icon={"/menu.svg"}
            alt="menu"
            modal={"sidemenu"}
            styles={"md:hidden"}
          />
          {/* Logo */}
          <div className="w-full">
            <Link href={"/"} prefetch={false}>
              <h1 className="font-bold sm:text-2xl">Muse Matrix</h1>
            </Link>
          </div>

          {/* NavMenu */}
          <NavMenu className="justify-center hidden gap-10 md:flex" />
        </div>

        {/* Left */}
        <div className="flex items-center gap-x-8">
          {isAdmin && (
            <>
              <UserButton />
              <Link
                href="/post/create"
                className="hidden button_primary md:block"
              >
                انشاء مقالة
              </Link>
            </>
          )}

          <DarkModeButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
