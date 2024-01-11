import PostContentView from "@/components/Post/PostContentView";
import Tag from "@/components/Tag";
import prisma from "@/lib/prisma";
import { tryCatch } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClientModal from "./ClientModal";
import { cache } from "react";
import { currentUser } from "@clerk/nextjs";

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
  const [post, error] = await tryCatch(getPost(id));
  if (error) throw new Error("Something went wrong");
  if (!post) notFound();
  return {
    title: post.title,
  };
}
async function page({ params }) {
  const user = await currentUser();
  const isAdmin = user?.publicMetadata.isAdmin;

  const { id } = params;
  const [post, error] = await tryCatch(getPost(id));
  if (error || !post) {
    notFound();
  }
  const { title, content, genre, author } = post;
  return (
    <div className="flex flex-col gap-5 app h-fit">
      <div className="flex flex-col items-center justify-between md:flex-row gap-y-2">
        <div className="flex flex-col flex-1 w-full gap-5">
          <Tag name={genre?.title} variation="Primary" />
          <h1 className={`text-[18px] font-bold landscape-[50px] `}>{title}</h1>
          <div className="flex items-center gap-6">
            <div className="flex gap-[12px] items-center">
              <div className="w-[36px] h-[36px] rounded-full">
                <Image
                  src={author?.avatar}
                  alt="avatar"
                  className="object-cover w-full h-full rounded-full"
                  width={36}
                  height={36}
                />
              </div>
              <span className="text-base font-medium">{author?.name}</span>
            </div>
          </div>
        </div>
        {isAdmin && (
          <div className="flex self-end gap-3 md:self-auto">
            <Link href={`/post/update/${params.id}`} prefetch={false}>
              <Image
                width={24}
                height={24}
                src="/edit.svg"
                className="white_filter"
                alt="post edit"
              />
            </Link>
            <ClientModal id={parseInt(params.id)} />
          </div>
        )}
      </div>
      <PostContentView htmlContent={content} Minimized={false} />
    </div>
  );
}

export default page;
