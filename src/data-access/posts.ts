import { TPost, postsDtoMapper } from "@/dtos/posts";
import prisma from "@/lib/prisma";
import {
  TCreatePost,
  TGetPostById,
  TGetPosts,
  TUpdatePost,
} from "@/schema/posts";
import { TPaginationQuery } from "@/types/types";

export const getPosts = async ({
  limit,
  page,
  ...where
}: TPaginationQuery & TGetPosts) => {
  const skip = page && limit && (page - 1) * limit;

  const post = await prisma.post.findMany({
    where,
    include: {
      author: true,
      genre: true,
    },
    take: limit,
    skip,
    orderBy: {
      updatedAt: "desc",
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

export const countPosts = async (where: TGetPosts = {}) => {
  return prisma.post.count({ where });
};

export const createPost = async (
  data: Omit<TCreatePost, "cover"> & { cover: TPost["cover"] },
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
}: Omit<TUpdatePost, "cover"> & { cover: TPost["cover"] }) => {
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
