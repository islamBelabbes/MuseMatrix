import Link from "next/link";
import React from "react";

type SectionEntryProps = {
  entry: string;
  href: string;
};

function SectionEntry({ entry, href }: SectionEntryProps) {
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold dark:text-white">{entry}</h1>
      <Link href={href}>{"المزيد"}</Link>
    </div>
  );
}

export default SectionEntry;
