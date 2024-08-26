import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Tag from "./tag";
import Link from "next/link";

function PostList({}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-center gap-5",
        {
          "grid-cols-[1fr] text-center": false,
        },
      )}
    >
      {true ? (
        Array(3)
          .fill(0)
          .map((_, i) => <PostCard key={i} />)
      ) : (
        <span>لا يوجد</span>
      )}
    </ul>
  );
}

const PostCard = () => {
  return (
    <li className="flex flex-col items-center gap-4 rounded-xl border border-secondary p-4">
      <div className="relative h-[240px] w-full">
        <Link className="mr-auto" href={`/post/20`}>
          <Image
            src={"https://picsum.photos/200"}
            alt="listing image"
            className={cn(
              "hover:animate-circle h-full w-full rounded-xl object-contain",
            )}
            width={500}
            height={500}
            placeholder="empty"
          />
        </Link>
      </div>

      <div className="flex w-full flex-1 flex-col gap-5 p-2">
        <div className="flex justify-between">
          <Tag name="كتب" variation="secondary" />
        </div>
        <Link href={`/post/20`}>
          <h1 className={`landscape-[50px] text-[18px] font-bold`}>
            الاسلام بين الشرق و الغرب
          </h1>
        </Link>

        <div className="mt-auto flex items-center gap-6">
          <div className="flex items-center gap-[12px]">
            <div className="relative h-[36px] w-[36px] rounded-full">
              <Image
                src="https://picsum.photos/200"
                alt="avatar"
                className="h-full w-full rounded-full object-cover"
                fill
              />
            </div>
            <span className="text-base font-medium">علي عزت بيغوفيتش</span>
          </div>

          <Link className="mr-auto" href={`/post/30`}>
            قراءة
          </Link>
        </div>
      </div>
    </li>
  );
};

export default PostList;
