import QuoteSlider from "@/components/Quote/QuoteSlider";
import { getQuotes } from "@/lib/db";
import { shuffle } from "@/lib/utils";
import prisma from "@/lib/prisma";
import AsyncPostListing from "@/components/Post/AsyncPostListing";
import { PostListingSkeleton } from "@/components/Skeleton/Skeleton";
import { Suspense } from "react";

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
  take: 3,
};
async function Home() {
  const quotes = await getQuotes({ limit: 5, page: 1 });

  const booksPromise = prisma.post.findMany({
    ...query,
    where: { ...query.where, genreId: 16 },
  });
  const podcastPromise = prisma.post.findMany({
    ...query,
    where: { ...query.where, genreId: 17 },
  });
  const articlesPromise = prisma.post.findMany({
    ...query,
    where: { ...query.where, genreId: 18 },
  });

  return (
    <>
      <div className="flex flex-col gap-[3rem] app">
        <QuoteSlider initializedData={shuffle(quotes.data)} />

        <Suspense fallback={<PostListingSkeleton count={3} hasEntry />}>
          <AsyncPostListing
            entry={"اخر الكتب"}
            promise={booksPromise}
            genreId={16}
          />
        </Suspense>

        <Suspense fallback={<PostListingSkeleton count={3} hasEntry />}>
          <AsyncPostListing
            entry={"اخر المقالات"}
            promise={articlesPromise}
            genreId={17}
          />
        </Suspense>

        <Suspense fallback={<PostListingSkeleton count={3} hasEntry />}>
          <AsyncPostListing
            entry={"اخر الصوتيات"}
            promise={podcastPromise}
            genreId={18}
          />
        </Suspense>
      </div>
    </>
  );
}

export default Home;
