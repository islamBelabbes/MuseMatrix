import { type Metadata } from "next";
import AuthorAvatar from "@/components/author-avatar";
import PostContentViewer from "@/components/post-content-viewr";
import Tag from "@/components/tag";
import { safeAsync } from "@/lib/safe";
import { getPostByIdUseCase, getPostsUseCase } from "@/use-cases/posts";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import { z } from "zod";
import { generateSeoTitle } from "@/lib/utils";

type TParams = {
  params: {
    id: string;
  };
};

const paramsSchema = z.coerce.number().catch(0);

const cachedPost = cache((id: number) => getPostByIdUseCase(id));

export async function generateStaticParams() {
  const Posts = await getPostsUseCase();
  return Posts.data.map((post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({ params }: TParams): Promise<Metadata> {
  const _id = paramsSchema.parse(params.id);
  if (!_id) notFound();

  const post = await safeAsync(cachedPost(_id));
  if (!post.success) notFound();
  return {
    title: generateSeoTitle([post.data.title]),
    description: post.data.title,
  };
}

async function PostPage({ params: { id } }: TParams) {
  const _id = paramsSchema.parse(id);
  if (!_id) notFound();

  const post = await safeAsync(cachedPost(_id));
  if (!post.success) notFound();
  return (
    <main className="app flex h-fit flex-col gap-5">
      <div className="flex flex-col items-center justify-between gap-y-2 md:flex-row">
        <div className="flex w-full flex-1 flex-col gap-5">
          <Tag name={post.data.genre.title} variation="primary" />
          <h1 className={`landscape-[50px] text-[18px] font-bold`}>
            {post.data.title}
          </h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-[12px]">
              <AuthorAvatar
                avatar={post.data.author.avatar}
                className="size-9"
              />
              <span className="text-base font-medium">
                {post.data.author.name}
              </span>
            </div>
          </div>
        </div>
      </div>
      <PostContentViewer htmlContent={post.data.content} Minimized={false} />
    </main>
  );
}

export default PostPage;
