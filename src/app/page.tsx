import QuotesSlider from "./_components/quotes-slider";
import PostList from "@/components/posts-list";
import SectionEntry from "./_components/section-entry";
import { getQuotesUseCase } from "@/use-cases/quotes";

export default async function HomePage() {
  return (
    <main className="app flex flex-col gap-[3rem]">
      <QuotesSlider />

      <div className="flex flex-col gap-10">
        <SectionEntry entry="المقالات" href="/posts" />
        <PostList />
      </div>

      <div className="flex flex-col gap-10">
        <SectionEntry entry="الاقتباسات" href="/quotes" />
        <PostList />
      </div>

      <div className="flex flex-col gap-10">
        <SectionEntry entry="التعليقات" href="/comments" />
        <PostList />
      </div>
    </main>
  );
}
