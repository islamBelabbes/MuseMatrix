import PostForm from "@/components/Post/postForm/PostForm";
import prisma from "@/lib/prisma";
import { tryCatch } from "@/lib/utils";
import { notFound } from "next/navigation";
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

  const { title, content, cover, genre, author, id } = post;
  return (
    <PostForm
      type="update"
      initializedData={{
        content,
        cover,
        title,
        genre: { value: genre?.id, label: genre?.title },
        author: { value: author?.id, label: author?.name },
      }}
      postId={id}
    />
  );
}

export default page;
