import { tryCatch } from "@/lib/utils";
import { notFound } from "next/navigation";

import IsAdmin from "@/components/IsAdmin";
import prisma from "@/lib/prisma";
import PostForm from "../../_components/postForm/PostForm";
async function page({ params }) {
  const [post, error] = await tryCatch(
    prisma.post.findUnique({
      where: {
        id: parseInt(params.id),
      },
      include: {
        genre: true,
        author: true,
      },
    })
  );
  if (error || !post) {
    notFound();
  }

  const { title, content, cover, genre, author, id, status } = post;
  return (
    <IsAdmin>
      <PostForm
        isUpdate
        initializedData={{
          content,
          cover,
          title,
          genre: { value: genre?.id, label: genre?.title },
          author: { value: author?.id, label: author?.name },
          status: { value: status, label: status },
        }}
        postId={id}
      />
    </IsAdmin>
  );
}

export default page;
