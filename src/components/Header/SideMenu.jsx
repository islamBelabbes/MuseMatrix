"use client";
import Link from "next/link";

import { useRouter } from "next13-progressbar";

import { NAV_LINKS } from "@/constants/constants";
import SideModal from "@/components/Modal/SideModal";
import { useModal } from "@/context/GlobalModalProvider";

function SideMenu() {
  const router = useRouter();
  const { closeModals } = useModal();

  const handleOnClick = (e) => {
    e.preventDefault();
    closeModals();
    router.push(e?.target?.href);
  };
  return (
    <SideModal>
      <ul className="flex-col gap-2 flex md:mt-0 mt-[10px]">
        {NAV_LINKS.map((link) => (
          <li
            key={link.id}
            className={`border-b w-full p-3 text-base font-medium leading-6 text-Secondary/600`}
          >
            <Link href={link.href} onClick={handleOnClick}>
              {link.name}
            </Link>
          </li>
        ))}
        <Link
          onClick={handleOnClick}
          href="/post/create"
          className="button_primary"
        >
          انشاء مقالة
        </Link>
      </ul>
    </SideModal>
  );
}

export default SideMenu;
