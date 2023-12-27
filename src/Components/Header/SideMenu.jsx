"use client";
import { NAV_LINKS } from "@/Constants/Constants";
import SideModal from "../Modal/SideModal";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/GlobalModalProvider";

function SideMenu() {
  const router = useRouter();
  const { closeModals } = useModal();

  const handleOnClick = (e, to) => {
    e.preventDefault();
    closeModals();
    router.push(to);
  };
  return (
    <SideModal>
      <ul className="flex-col gap-2 flex md:mt-0 mt-[10px]">
        {NAV_LINKS.map((link) => (
          <li
            key={link.id}
            className={`border-b w-full p-3 text-base font-medium leading-6 text-Secondary/600`}
          >
            <a href={link.href} onClick={(e) => handleOnClick(e, link.href)}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </SideModal>
  );
}

export default SideMenu;
