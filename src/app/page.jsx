import { currentUser } from "@clerk/nextjs";

import PostListing from "@/components/Post/PostListing";
import QuoteSlider from "@/components/Quote/QuoteSlider";
import { getQuotes } from "@/lib/db";
import { shuffle } from "@/lib/utils";
import prisma from "@/lib/prisma";

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
  const user = await currentUser();
  const isAdmin = user?.publicMetadata.isAdmin;

  const quotesPromise = getQuotes();
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

  const [quotes, books, podcast, articles] = await Promise.all([
    quotesPromise,
    booksPromise,
    podcastPromise,
    articlesPromise,
  ]);

  return (
    <>
      <div className="flex flex-col gap-[3rem] app">
        <QuoteSlider initializedData={shuffle(quotes)} />

        <PostListing
          entry={"اخر الكتب"}
          data={books}
          genreId={16}
          isAdmin={isAdmin}
        />

        <PostListing
          entry={"اخر المقالات"}
          data={articles}
          genreId={17}
          isAdmin={isAdmin}
        />

        <PostListing
          entry={"اخر الصوتيات"}
          data={podcast}
          genreId={18}
          isAdmin={isAdmin}
        />
      </div>
    </>
  );
}

export default Home;
