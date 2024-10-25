import CreateButton from "../_components/create-button";
import { getPostsUseCase } from "@/use-cases/posts";
import PostsTable from "../_components/posts-table";
import { PageSchema } from "@/schema/schema";
import { getCurrentUser } from "@/lib/kinde-auth";
import { safeAsync } from "@/lib/safe";

const LIMIT = 10;

export default async function DraftPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const user = await safeAsync(getCurrentUser());
  const page = PageSchema.parse(searchParams.page);

  const posts = await getPostsUseCase({
    status: "Draft",
    limit: LIMIT,
    page,
    user: user.success ? user.data : undefined,
  });
  return (
    <div>
      <CreateButton href="/dashboard/posts/create">إنشاء مقالة</CreateButton>
      <PostsTable posts={posts} limit={LIMIT} />
    </div>
  );
}
