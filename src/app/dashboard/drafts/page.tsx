import CreateButton from "../_components/create-button";
import { getPostsUseCase } from "@/use-cases/posts";
import PostsTable from "../_components/posts-table";
import { PageSchema } from "@/schema/schema";

const LIMIT = 1;

export default async function DraftPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = PageSchema.parse(searchParams.page);
  const posts = await getPostsUseCase({
    status: "Draft",
    limit: LIMIT,
    page,
  });
  return (
    <div>
      <CreateButton>إنشاء مقالة</CreateButton>
      <PostsTable posts={posts} limit={LIMIT} />
    </div>
  );
}