import { MEDIA_URL } from "@/lib/constants";
import { AppError } from "@/lib/error";
import { safeAsync } from "@/lib/safe";
import { IdSchema } from "@/schema/schema";
import { getPostByIdUseCase } from "@/use-cases/posts";
import { notFound } from "next/navigation";
import React from "react";
import PostForm from "../../_components/post-form";

export default async function UpdatePostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const _id = (await params).id;
  const id = IdSchema.parse(_id);
  const post = await safeAsync(getPostByIdUseCase({ id }));

  if (!post.success) {
    if (post.error instanceof AppError && post.error.statusCode === 404) {
      notFound();
    }

    throw post.error;
  }

  return (
    <PostForm
      initialData={{
        id: post.data.id,
        author: post.data.author,
        genre: post.data.genre,
        title: post.data.title,
        status: post.data.status,
        authorId: post.data.authorId,
        genreId: post.data.genreId,
        content: post.data.content,
        coverUrl: `${MEDIA_URL}/${post.data.cover}`,
      }}
    />
  );
}
