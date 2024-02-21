import { currentUser } from "@clerk/nextjs";

import PostListing from "@/components/Post/PostListing";
import prisma from "@/lib/prisma";

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
      <PostListing data={drafts} isAdmin={isAdmin} />
    </div>
  );
}

export default page;
