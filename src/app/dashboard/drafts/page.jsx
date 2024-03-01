import { PostsTable } from "../_componenets/tables/PostsTable/Table";
import { getPosts } from "@/lib/db";

const query = { limit: 1, status: "Draft" };
const page = async () => {
  const posts = await getPosts(query);

  return <PostsTable initialData={posts} query={query} queryKey={"draft"} />;
};

export default page;
