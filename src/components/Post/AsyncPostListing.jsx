import React from "react";
import PostListing from "./PostListing";

async function AsyncPostListing({ promise, genreId, entry }) {
  const posts = await promise;
  return <PostListing data={posts} genreId={genreId} entry={entry} />;
}

export default AsyncPostListing;
