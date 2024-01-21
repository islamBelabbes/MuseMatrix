import PostListing from "@/components/Post/PostListing";
import { PostListingSkeleton } from "@/components/Skeleton/Skeleton";
import { currentUser } from "@clerk/nextjs";
import React, { Suspense } from "react";

const query = {
  where: {
    status: "Draft",
  },
  include: {
    genre: true,
    author: true,
  },
};
async function page() {
  const user = await currentUser();
  const isAdmin = user?.publicMetadata.isAdmin;
  return (
    <div className="flex flex-col gap-5 app">
      <Suspense fallback={<PostListingSkeleton count={6} />}>
        <PostListing query={query} isAdmin={isAdmin} />
      </Suspense>
    </div>
  );
}

export default page;
