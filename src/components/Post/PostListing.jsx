import React from "react";
import Card from "./Card";
import Conditional from "../Conditional";
import { cn } from "@/lib/utils";
import Link from "next/link";

function PostListing({ entry = null, data = [], genreId, isAdmin }) {
  return (
    <div className="flex flex-col gap-8 ">
      <Conditional
        condition={entry}
        onTrue={
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold dark:text-white ">{entry}</h1>
            <Link href={`/genre/${genreId}`}>{"المزيد"}</Link>
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
          onTrue={data?.map((post) => (
            <Card key={post.id} post={post} isAdmin={isAdmin} />
          ))}
          onFalse={<span>لا يوجد</span>}
        />
      </div>
    </div>
  );
}

export default PostListing;
