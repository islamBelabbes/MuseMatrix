import React from "react";
import Image from "next/image";
import Tag from "../Tag";
import Link from "next/link";
import avatar from "../../../public/avatar.jpg";
import { cn } from "@/lib/utils";
function Card({ isBook = false, item }) {
  const { title, cover, genre, author, id } = item;
  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-xl border-Secondary">
      <div className="w-full h-[240px] relative">
        <Link className="mr-auto" href={`/post/${id}`}>
          <Image
            src={cover}
            alt="listing image"
            className={cn("rounded-xl hover:animate-circle w-full h-full", {
              "object-contain": isBook,
              "object-cover ": !isBook,
            })}
            width={500}
            height={500}
            placeholder="empty"
          />
        </Link>
      </div>

      <div className="flex flex-col flex-1 w-full gap-5 p-2">
        <div className="flex justify-between">
          <Tag name={genre?.title} variation="Secondary" />
          <Link href={`/post/update/${id}`}>
            <Image
              width={24}
              height={24}
              src="/edit.svg"
              className="white_filter"
              alt="post edit"
            />
          </Link>
        </div>
        <Link href={`/post/${id}`}>
          <h1 className={`text-[18px] font-bold landscape-[50px] `}>{title}</h1>
        </Link>

        <div className="flex items-center gap-6 mt-auto">
          <div className="flex gap-[12px] items-center">
            <div className="w-[36px] h-[36px] rounded-full relative">
              <Image
                src={author.avatar}
                alt="avatar"
                className="object-cover w-full h-full rounded-full"
                fill
              />
            </div>
            <span className="text-base font-medium">{author.name}</span>
          </div>

          <Link className="mr-auto" href={`/post/${id}`}>
            قراءة
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
