import { currentUser } from "@clerk/nextjs";

import PostListing from "@/components/Post/PostListing";
import prisma from "@/lib/prisma";
import Link from "next/link";

const query = {
  where: {
    status: "Draft",
  },
  include: {
    genre: true,
    author: true,
  },
};
async function page() {
  const user = await currentUser();
  const isAdmin = user?.publicMetadata.isAdmin;

  const drafts = await prisma.post.findMany(query);
  return (
    <div className="flex flex-col gap-5 app">
      <Link className="button_primary" href="posts/create">
        Create Now Post
      </Link>
      <PostListing data={drafts} isAdmin={isAdmin} />
    </div>
  );
}

export default page;
