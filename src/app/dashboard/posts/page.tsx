import CreateButton from "../_components/create-button";
import { getPostsUseCase } from "@/use-cases/posts";
import PostsTable from "../_components/posts-table";
import { PageSchema } from "@/schema/schema";

const LIMIT = 10;

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const _page = (await searchParams).page;
  const page = PageSchema.parse(_page);
  const posts = await getPostsUseCase({
    status: "Published",
    limit: LIMIT,
    page,
  });
  return (
    <>
      <CreateButton href="/dashboard/posts/create">إنشاء مقالة</CreateButton>
      <PostsTable posts={posts} limit={LIMIT} />
    </>
  );
}
