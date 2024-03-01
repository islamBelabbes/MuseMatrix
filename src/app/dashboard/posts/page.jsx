import prisma from "@/lib/prisma";
import { PostsTable } from "../_componenets/tables/PostsTable/Table";

const page = async () => {
  const posts = await prisma.post.findMany();

  console.log(posts);
  return <PostsTable initialData={posts} />;
};

export default page;
