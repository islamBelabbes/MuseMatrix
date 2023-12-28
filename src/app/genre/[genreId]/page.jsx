import PostListing from "@/components/Post/PostListing";

import React, { Suspense } from "react";
import { PostListingSkeleton } from "@/components/Skeleton/Skeleton";

export const revalidate = 0;

const booksId = 16;

const query = {
  where: {
    genreId: null,
  },
  include: {
    genre: true,
    author: true,
  },
};

function CategoryListing({ params }) {
  return (
    <div className="flex flex-col gap-5 app">
      <Suspense fallback={<PostListingSkeleton count={6} />}>
        <PostListing
          isBook={parseInt(params.genreId) === booksId}
          query={{ ...query, where: { genreId: parseInt(params.genreId) } }}
        />
      </Suspense>
    </div>
  );
}

export default CategoryListing;
