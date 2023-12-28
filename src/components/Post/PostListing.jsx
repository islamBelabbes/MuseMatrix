import React from "react";
import Card from "./Card";
import Conditional from "../Conditional";
import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

const QUERY = {
  include: {
    genre: true,
    author: true,
  },
};
async function PostListing({ entry = null, isBook = false, query = QUERY }) {
  const data = await prisma.post.findMany(query);

  return (
    <div className="flex flex-col gap-8 ">
      <Conditional
        condition={entry}
        onTrue={
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold dark:text-white ">{entry}</h1>
            <span>{"المزيد"}</span>
          </div>
        }
      />
      <div
        className={cn(
          "grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-center gap-5",
          {
            "grid-cols-[1fr] text-center": !data?.length > 0,
          }
        )}
      >
        <Conditional
          condition={data?.length > 0}
          onTrue={data?.map((item) => (
            <Card key={item.id} item={item} isBook={isBook} />
          ))}
          onFalse={<span>لا يوجد</span>}
        />
      </div>
    </div>
  );
}

export default PostListing;
