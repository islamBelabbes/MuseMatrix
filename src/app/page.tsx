import QuotesSlider from "./_components/quotes-slider";
import PostList from "@/components/posts-list";
import SectionEntry from "./_components/section-entry";
import { getPostsUseCase } from "@/use-cases/posts";
import { getQuotesUseCase } from "@/use-cases/quotes";
import { getGenresUseCase } from "@/use-cases/genres";

export default async function HomePage() {
  const genres = await getGenresUseCase();
  const postsPromise = genres.data
    .slice(0, 3)
    .map((genre) =>
      getPostsUseCase({ genreId: genre.id, limit: 3, status: "Published" }),
    );
  const quotesPromise = getQuotesUseCase({ limit: 5 });

  const [posts, quotes] = await Promise.all([
    Promise.all(postsPromise),
    quotesPromise,
  ]);

  const nonEmptyPosts = posts.filter((post) => post.data.length > 0);

  return (
    <main className="app flex flex-col gap-[3rem]">
      <QuotesSlider quotes={quotes.data} />

      {nonEmptyPosts.map((post, index) => (
        <div className="flex flex-col gap-10" key={index}>
          {post.data[0]?.genre && (
            <SectionEntry
              entry={post.data[0].genre.title}
              href={`/genre/${post.data[0].genre.id}`}
            />
          )}
          <PostList posts={post.data} />
        </div>
      ))}
    </main>
  );
}
