import Quote from "@/components/Quote/Quote";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const QUOTES = [
  {
    id: 1,
    content:
      "اعظم الضلال ليس من اخطاء في جواب الغاية وعاش طبقا عنه بل من اخطاء جواب الغاية وضل يعيش وفق جوابه كاطار للحياة",
    author: "سامي العامري",
    authorAvatar:
      "https://utfs.io/f/0c4d2bfc-5cf0-477f-bdfc-92846f8f0a7b-8xaqvb.jpg",
    color: "#5f738d",
    book: "الانسان والبحث عن معنى",
  },
];
function page() {
  return (
    <div className="app">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(263px,1fr))] justify-center gap-5">
        <li className="flex border border-black  items-center gap-5 flex-col max-h-[370px] rounded-xl py-7  justify-center">
          <Link prefetch={false} href="/quotes/create">
            <Image
              alt="add new"
              src="/add-new.png"
              width={100}
              height={100}
              className="object-contain cursor-pointer"
            />
          </Link>
        </li>
        {QUOTES.map((item) => (
          <Quote
            key={item.id}
            author={item.author}
            content={item.content}
            book={item.book}
            avatar={item.authorAvatar}
            background={item?.color}
          />
        ))}
      </ul>
    </div>
  );
}

export default page;
