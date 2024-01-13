import PostListing from "@/components/Post/PostListing";
import { Suspense } from "react";
import { PostListingSkeleton } from "@/components/Skeleton/Skeleton";
import { currentUser } from "@clerk/nextjs";
import QuoteSlider from "@/components/Quote/QuoteSlider";
import { getQuotes } from "@/lib/db";

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
  const user = await currentUser();
  const isAdmin = user?.publicMetadata.isAdmin;
  const quotes = await getQuotes();
  return (
    <>
      <div className="flex flex-col gap-[3rem] app">
        <QuoteSlider initializedData={quotes} />

        <Suspense fallback={<PostListingSkeleton count={3} hasEntry />}>
          <PostListing
            entry={"اخر الكتب"}
            isBook
            query={{ ...query, where: { genreId: 16 } }}
            genreId={16}
            isAdmin={isAdmin}
          />
        </Suspense>

        <Suspense fallback={<PostListingSkeleton count={3} hasEntry />}>
          <PostListing
            entry={"اخر المقالات"}
            query={{ ...query, where: { genreId: 17 } }}
            genreId={17}
            isAdmin={isAdmin}
          />
        </Suspense>

        <Suspense fallback={<PostListingSkeleton count={3} hasEntry />}>
          <PostListing
            entry={"اخر الصوتيات"}
            query={{ ...query, where: { genreId: 18 } }}
            genreId={18}
            isAdmin={isAdmin}
          />
        </Suspense>
      </div>
    </>
  );
}

export default Home;
