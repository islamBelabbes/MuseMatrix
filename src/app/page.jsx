import QuoteSlider from "@/components/Quote/QuoteSlider";
import { getQuotes } from "@/lib/db";
import { shuffle } from "@/lib/utils";
import prisma from "@/lib/prisma";
import AsyncPostListing from "@/components/Post/AsyncPostListing";
import { PostListingSkeleton } from "@/components/Skeleton/Skeleton";
import { Suspense } from "react";
import { unstable_cache as cache } from "next/cache";

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

const cachedGetQuotes = cache(
  async () => getQuotes({ limit: 5, page: 1 }),
  ["home_quotes"],
  { tags: ["quotes"] }
);
const cachedGetBooks = cache(
  async () =>
    prisma.post.findMany({
      ...query,
      where: { ...query.where, genreId: 16 },
    }),
  ["books_listing"],
  { tags: ["posts_listing"] }
);
const cachedGetPodcasts = cache(
  async () =>
    prisma.post.findMany({
      ...query,
      where: { ...query.where, genreId: 17 },
    }),
  ["podcasts_listing"],
  { tags: ["posts_listing"] }
);
const cachedGetArticles = cache(
  async () =>
    prisma.post.findMany({
      ...query,
      where: { ...query.where, genreId: 18 },
    }),
  ["articles_listing"],
  { tags: ["posts_listing"] }
);

async function Home() {
  const quotes = await cachedGetQuotes();
  const booksPromise = cachedGetBooks();
  const podcastPromise = cachedGetPodcasts();
  const articlesPromise = cachedGetArticles();

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
