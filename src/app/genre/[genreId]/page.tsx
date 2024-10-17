import PostList from "@/components/posts-list";
import { safeAsync } from "@/lib/safe";
import { generateSeoTitle } from "@/lib/utils";
import { getGenreByIdUseCase, getGenresUseCase } from "@/use-cases/genres";
import { getPostsUseCase } from "@/use-cases/posts";
import { notFound } from "next/navigation";
import React from "react";
import { z } from "zod";

const LIMIT_DATA = 1;

const paramsSchema = z.coerce.number().catch(0);

export async function generateMetadata({
  params,
}: {
  params: { genreId: string };
}) {
  const _genreId = paramsSchema.parse(params.genreId);
  if (!_genreId) notFound();

  const genre = await safeAsync(getGenreByIdUseCase(_genreId));
  if (!genre.success) notFound();

  return {
    title: generateSeoTitle([genre.data.title]),
  };
}

export async function generateStaticParams() {
  const genres = await getGenresUseCase({ limit: -1, page: 1 });

  return genres.data.map((genre) => ({
    genreId: genre.id.toString(),
  }));
}

async function Page({ params: { genreId } }: { params: { genreId: string } }) {
  const _genreId = paramsSchema.parse(genreId);
  if (!_genreId) notFound();

  const posts = await getPostsUseCase({
    genreId: _genreId,
    status: "Published",
    limit: LIMIT_DATA,
  });

  return (
    <main className="app">
      <PostList posts={posts} limit={LIMIT_DATA} genreId={_genreId} />
    </main>
  );
}

export default Page;
