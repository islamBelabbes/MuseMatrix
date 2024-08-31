import PostList from "@/components/posts-list";
import { getPostsUseCase } from "@/use-cases/posts";
import { notFound } from "next/navigation";
import React from "react";
import { z } from "zod";

const paramsSchema = z.coerce.number().catch(0);

async function Page({ params: { genreId } }: { params: { genreId: string } }) {
  const _genreId = paramsSchema.parse(genreId);
  if (!_genreId) notFound();

  const posts = await getPostsUseCase({
    genreId: _genreId,
  });

  return <main className="app">{<PostList posts={posts.data} />}</main>;
}

export default Page;
