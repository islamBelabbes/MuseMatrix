import { getPosts } from "@/lib/db";
import { PostsTable } from "../_components/PostsTable/Table";

const query = { limit: 10, status: "Draft", page: 1 };
const page = async () => {
  const posts = await getPosts(query);

  return <PostsTable initialData={posts} query={query} queryKey={"draft"} />;
};

export default page;
