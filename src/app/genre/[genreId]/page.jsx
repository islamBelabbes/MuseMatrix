import PostListing from "@/Components/Post/PostListing";

import React, { Suspense } from "react";
import { PostListingSkeleton } from "@/Components/Skeleton/Skeleton";

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
