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

  const posts = await prisma.post.findMany({
    ...query,
    where: { ...query.where, genreId: genreId },
  });

  return (
    <div className="flex flex-col gap-5 app">
      <PostListing data={posts} isAdmin={isAdmin} />
    </div>
  );
}

export default CategoryListing;
