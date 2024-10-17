"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Tag from "./tag";
import Link from "next/link";
import { TPost } from "@/dto/posts";
import { MEDIA_URL } from "@/lib/constants";
import AuthorAvatar from "./author-avatar";
import { usePostsInfiniteQuery } from "@/lib/react-query/queries";
import { TDataWithPagination } from "@/types/types";
import LoadMoreButton from "./load-more-button";

type TPostsListProps = {
  posts: TDataWithPagination<TPost[]>;
  withLoadMore?: boolean;
  limit: number;
  genreId: number;
};

// pick only the fields we need
type TPostCardProps = Pick<TPost, "id" | "title" | "cover"> & {
  genre: Pick<TPost["genre"], "title">;
  author: Pick<TPost["author"], "name" | "avatar">;
};

function PostList({
  posts,
  withLoadMore = true,
  limit,
  genreId,
}: TPostsListProps) {
  const { data, isFetchingNextPage, isError, fetchNextPage, hasNextPage } =
    usePostsInfiniteQuery(limit, withLoadMore, genreId, posts);

  const mappedQuotes = data?.pages.reduce<TPost[]>((acc, current) => {
    return [...acc, ...current.data];
  }, []);

  if (isError) return;

  return (
    <div className="flex flex-col items-center gap-4">
      <ul
        className={cn(
          "grid w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))] justify-center gap-5",
          {
            "grid-cols-[1fr] text-center": !mappedQuotes?.length,
          },
        )}
      >
        {mappedQuotes?.length ? (
          mappedQuotes?.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              cover={`${MEDIA_URL}/${post.cover}`}
              author={{
                avatar: post.author.avatar,
                name: post.author.name,
              }}
              genre={{
                title: post.genre.title,
              }}
            />
          ))
        ) : (
          <h1 className="my-5 text-center text-2xl">
            لايوجد مقالات لهذا التصنيف
          </h1>
        )}
      </ul>

      {withLoadMore && hasNextPage && (
        <LoadMoreButton
          onClick={fetchNextPage}
          isLoading={isFetchingNextPage}
        />
      )}
    </div>
  );
}

const PostCard = ({ ...post }: TPostCardProps) => {
  return (
    <li className="flex flex-col items-center gap-4 rounded-xl border border-secondary p-4">
      <div className="relative h-[240px] w-full">
        <Link className="mr-auto" href={`/post/${post.id}`}>
          <Image
            src={post.cover}
            alt="listing image"
            className={cn(
              "hover:animate-circle h-full w-full rounded-xl object-contain",
            )}
            width={500}
            height={500}
            placeholder="empty"
          />
        </Link>
      </div>

      <div className="flex w-full flex-1 flex-col gap-5 p-2">
        <div className="flex justify-between">
          <Tag name={post.genre.title} variation="secondary" />
        </div>
        <Link href={`/post/${post.id}`}>
          <h1 className={`landscape-[50px] text-[18px] font-bold`}>
            {post.title}
          </h1>
        </Link>

        <div className="mt-auto flex items-center gap-6">
          <div className="flex items-center gap-[12px]">
            <AuthorAvatar
              avatar={`${MEDIA_URL}/${post.author.avatar}`}
              className="size-9"
            />
            <span className="text-base font-medium">{post.author.name}</span>
          </div>

          <Link className="mr-auto" href={`/post/${post.id}`}>
            قراءة
          </Link>
        </div>
      </div>
    </li>
  );
};

export default PostList;
