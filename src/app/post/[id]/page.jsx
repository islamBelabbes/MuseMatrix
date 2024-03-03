import AuthorAvatar from "@/components/AuthorAvatar";
import PostContentView from "@/components/Post/PostContentView";
import Tag from "@/components/Tag";
import prisma from "@/lib/prisma";
import { tryCatch } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

const getPost = cache(async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      genre: true,
      author: true,
    },
  });
  return post;
});

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = params;
  if (!parseInt(id)) notFound();
  const [post, error] = await tryCatch(getPost(id));
  if (error) throw new Error("Something went wrong");
  if (!post) notFound();
  return {
    title: post.title,
  };
}
async function page({ params }) {
  const { id } = params;
  if (!parseInt(id)) notFound();
  const [post, error] = await tryCatch(getPost(id));
  if (error || !post) {
    notFound();
  }
  const { title, content, genre, author } = post;
  return (
    <div className="flex flex-col gap-5 app h-fit">
      <div className="flex flex-col items-center justify-between md:flex-row gap-y-2">
        <div className="flex flex-col flex-1 w-full gap-5">
          <Tag name={genre?.title} variation="primary" />
          <h1 className={`text-[18px] font-bold landscape-[50px] `}>{title}</h1>
          <div className="flex items-center gap-6">
            <div className="flex gap-[12px] items-center">
              <AuthorAvatar image={author?.avatar} size={36} />
              <span className="text-base font-medium">{author?.name}</span>
            </div>
          </div>
        </div>
      </div>
      <PostContentView htmlContent={content} Minimized={false} />
    </div>
  );
}

export default page;
