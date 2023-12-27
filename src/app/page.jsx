import Hero from "@/Components/Hero/Hero";
import PostListing from "@/Components/Post/PostListing";
import { Suspense } from "react";
import { PostListingSkeleton } from "@/Components/Skeleton/Skeleton";

export const revalidate = 0;

const query = {
  where: {
    genreId: null,
  },
  include: {
    genre: true,
    author: true,
  },
  take: 3,
};
async function Home() {
  return (
    <>
      <div className="flex flex-col gap-[3rem] app">
        <Hero />

        <Suspense fallback={<PostListingSkeleton count={3} hasEntry />}>
          <PostListing
            entry={"اخر الكتب"}
            isBook
            query={{ ...query, where: { genreId: 16 } }}
          />
        </Suspense>

        <Suspense fallback={<PostListingSkeleton count={3} hasEntry />}>
          <PostListing
            entry={"اخر المقالات"}
            query={{ ...query, where: { genreId: 17 } }}
          />
        </Suspense>

        <Suspense fallback={<PostListingSkeleton count={3} hasEntry />}>
          <PostListing
            entry={"اخر الصوتيات"}
            query={{ ...query, where: { genreId: 18 } }}
          />
        </Suspense>
      </div>
    </>
  );
}

export default Home;
