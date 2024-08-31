import QuotesSlider from "./_components/quotes-slider";
import PostList from "@/components/posts-list";
import SectionEntry from "./_components/section-entry";
import { getPostsUseCase } from "@/use-cases/posts";

export default async function HomePage() {
  const posts = await getPostsUseCase({ limit: 3 });

  return (
    <main className="app flex flex-col gap-[3rem]">
      <QuotesSlider />

      <div className="flex flex-col gap-10">
        <SectionEntry entry="المقالات" href="/posts" />
        <PostList posts={posts.data} />
      </div>

      <div className="flex flex-col gap-10">
        <SectionEntry entry="الاقتباسات" href="/quotes" />
        <PostList posts={posts.data} />
      </div>

      <div className="flex flex-col gap-10">
        <SectionEntry entry="التعليقات" href="/comments" />
        <PostList posts={posts.data} />
      </div>
    </main>
  );
}
