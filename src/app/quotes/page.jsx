import { cn } from "@/lib/utils";
import Image from "next/image";
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
  },
  {
    id: 1,
    content:
      "اعظم الضلال ليس من اخطاء في جواب الغاية وعاش طبقا عنه بل من اخطاء جواب الغاية وضل يعيش وفق جوابه كاطار للحياة",
    author: "فيكتور فرانكل",
    authorAvatar:
      "https://utfs.io/f/45d21d84-d507-4e54-8d73-5369fc453d8d-4radlf.jpg	",
  },
  {
    id: 1,
    content:
      "ان من يجد سببا يحيا به فإن بمقدوره غالبا ان يتحمل في سبيله كل الصعاب بأي وسيلة من الوسائل ",
    author: "فيكتور فرانكل",
    authorAvatar:
      "https://utfs.io/f/45d21d84-d507-4e54-8d73-5369fc453d8d-4radlf.jpg	",
  },
  {
    id: 1,
    content:
      "ان من يجد سببا يحيا به فإن بمقدوره غالبا ان يتحمل في سبيله كل الصعاب بأي وسيلة من الوسائل ",
    author: "فيكتور فرانكل",
    authorAvatar:
      "https://utfs.io/f/45d21d84-d507-4e54-8d73-5369fc453d8d-4radlf.jpg	",
  },
  {
    id: 1,
    content:
      "ان من يجد سببا يحيا به فإن بمقدوره غالبا ان يتحمل في سبيله كل الصعاب بأي وسيلة من الوسائل ",
    author: "فيكتور فرانكل",
    authorAvatar:
      "https://utfs.io/f/45d21d84-d507-4e54-8d73-5369fc453d8d-4radlf.jpg	",
  },
  {
    id: 1,
    content:
      "ان من يجد سببا يحيا به فإن بمقدوره غالبا ان يتحمل في سبيله كل الصعاب بأي وسيلة من الوسائل ",
    author: "فيكتور فرانكل",
    authorAvatar:
      "https://utfs.io/f/45d21d84-d507-4e54-8d73-5369fc453d8d-4radlf.jpg	",
  },
  {
    id: 1,
    content:
      "ان من يجد سببا يحيا به فإن بمقدوره غالبا ان يتحمل في سبيله كل الصعاب بأي وسيلة من الوسائل ",
    author: "فيكتور فرانكل",
    authorAvatar:
      "https://utfs.io/f/45d21d84-d507-4e54-8d73-5369fc453d8d-4radlf.jpg	",
  },
  {
    id: 1,
    content:
      "ان من يجد سببا يحيا به فإن بمقدوره غالبا ان يتحمل في سبيله كل الصعاب بأي وسيلة من الوسائل ",
    author: "فيكتور فرانكل",
    authorAvatar:
      "https://utfs.io/f/45d21d84-d507-4e54-8d73-5369fc453d8d-4radlf.jpg	",
  },
  {
    id: 1,
    content:
      "ان من يجد سببا يحيا به فإن بمقدوره غالبا ان يتحمل في سبيله كل الصعاب بأي وسيلة من الوسائل ",
    author: "فيكتور فرانكل",
    authorAvatar:
      "https://utfs.io/f/45d21d84-d507-4e54-8d73-5369fc453d8d-4radlf.jpg	",
  },
  {
    id: 1,
    content:
      "ان من يجد سببا يحيا به فإن بمقدوره غالبا ان يتحمل في سبيله كل الصعاب بأي وسيلة من الوسائل ",
    author: "فيكتور فرانكل",
    authorAvatar:
      "https://utfs.io/f/45d21d84-d507-4e54-8d73-5369fc453d8d-4radlf.jpg	",
  },
];
function page() {
  return (
    <div className="app">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(263px,1fr))] justify-center gap-5">
        {QUOTES.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-5 flex-col max-h-[370px] rounded-xl py-7"
            style={{ background: item.color ? item.color : "#262D33" }}
          >
            <div className="w-[156px] h-[156px]">
              <Image
                src={item?.authorAvatar}
                alt="author avatar"
                width={156}
                height={156}
                className="block object-cover w-full h-full rounded-full"
              />
            </div>
            <div className="px-3 text-center text-white">
              <p className="text-xs font-medium leading-4 line-clamp-1">
                {item.author}
              </p>
              <p className="text-base font-bold leading-6 line-clamp-3">
                {item.content}
              </p>
            </div>
            <div className="flex items-center self-stretch justify-center mt-2 text-center text-white border-t">
              <span className="mt-2">الانسان والبحث عن معنى</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default page;
