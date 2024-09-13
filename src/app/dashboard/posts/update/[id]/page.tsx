import PostForm from "@/app/dashboard/_components/post-form/post-form";
import { MEDIA_URL } from "@/lib/constants";
import { AppError } from "@/lib/error";
import { safeAsync } from "@/lib/safe";
import { urlToFile } from "@/lib/utils";
import { IdSchema } from "@/schema/schema";
import { getPostByIdUseCase } from "@/use-cases/posts";
import { notFound } from "next/navigation";
import React from "react";

export default async function UpdatePostPage({
  params,
}: {
  params: { id: string };
}) {
  const id = IdSchema.parse(params.id);
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
        author: post.data.author,
        genre: post.data.genre,
        title: post.data.title,
        status: post.data.status,
        authorId: post.data.authorId,
        genreId: post.data.genreId,
        content: post.data.content,
        // cover: "",
      }}
    />
  );
}
