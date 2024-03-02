import PostListing from "@/components/Post/PostListing";
import prisma from "@/lib/prisma";

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

  const posts = await prisma.post.findMany({
    ...query,
    where: { ...query.where, genreId: genreId },
  });

  return (
    <div className="flex flex-col gap-5 app">
      <PostListing data={posts} />
    </div>
  );
}

export default CategoryListing;
