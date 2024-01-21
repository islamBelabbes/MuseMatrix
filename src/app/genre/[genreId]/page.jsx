import PostListing from "@/components/Post/PostListing";

import React, { Suspense } from "react";
import { PostListingSkeleton } from "@/components/Skeleton/Skeleton";
import { currentUser } from "@clerk/nextjs";

export const revalidate = 0;

const query = {
  where: {
    genreId: null,
    status: "Published",
  },
  include: {
    genre: true,
    author: true,
  },
};

async function CategoryListing({ params }) {
  const genreId = parseInt(params.genreId);

  const user = await currentUser();
  const isAdmin = user?.publicMetadata.isAdmin;
  return (
    <div className="flex flex-col gap-5 app">
      <Suspense fallback={<PostListingSkeleton count={6} />}>
        <PostListing
          query={{ ...query, where: { ...query.where, genreId: genreId } }}
          isAdmin={isAdmin}
        />
      </Suspense>
    </div>
  );
}

export default CategoryListing;
