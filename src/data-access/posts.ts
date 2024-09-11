import { postsDtoMapper } from "@/dtos/posts";
import { PAGINATION } from "@/lib/constants";
import prisma from "@/lib/prisma";
import {
  TCreatePost,
  TGetPostById,
  TGetPosts,
  TUpdatePost,
} from "@/schema/posts";
import { TQueryWithPagination } from "@/types/types";
import { Post } from "@prisma/client";

export const getPosts = async ({
  limit = PAGINATION.LIMIT,
  page = PAGINATION.PAGE,
  title,
  ...where
}: TQueryWithPagination<TGetPosts>) => {
  const skip = limit === -1 ? undefined : (page - 1) * limit;
  const take = limit === -1 ? undefined : limit;
  const post = await prisma.post.findMany({
    where: {
      ...where,
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
    include: {
      author: true,
      genre: true,
    },
    take,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  return post.map(postsDtoMapper);
};

export const getPostById = async (where: TGetPostById) => {
  const post = await prisma.post.findUnique({
    where,
    include: {
      author: true,
      genre: true,
    },
  });

  if (!post) return null;
  return postsDtoMapper(post);
};

export const countPosts = async (where?: TGetPosts) => {
  return prisma.post.count({ where });
};

export const createPost = async (
  data: Omit<TCreatePost, "cover"> & { cover: Post["cover"] },
) => {
  const post = await prisma.post.create({
    data,
    include: {
      genre: true,
      author: true,
    },
  });

  return postsDtoMapper(post);
};

export const updatePost = async ({
  id,
  ...data
}: Omit<TUpdatePost, "cover"> & { cover?: Post["cover"] }) => {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data,
    include: {
      genre: true,
      author: true,
    },
  });

  return postsDtoMapper(post);
};

export const deletePost = async (id: number) => {
  return prisma.post.delete({
    where: {
      id,
    },
  });
};
