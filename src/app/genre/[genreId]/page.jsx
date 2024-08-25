import PostListing from "@/components/Post/PostListing";
import prisma from "@/lib/prisma";
import { unstable_cache as cache } from "next/cache";

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

const cachedGetPosts = cache(
  async (id) =>
    prisma.post.findMany({
      ...query,
      where: { ...query.where, genreId: id },
    }),
  ["genre_posts_listing"],
  {
    tags: ["posts_listing"],
  }
);

async function CategoryListing({ params }) {
  const genreId = parseInt(params.genreId);
  const posts = await cachedGetPosts(genreId);

  return (
    <div className="flex flex-col gap-5 app">
      <PostListing data={posts} />
    </div>
  );
}

export default CategoryListing;
