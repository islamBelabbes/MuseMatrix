import prisma from "@/lib/prisma";
import { TCreatePost, TGetPosts, TUpdatePost } from "@/schema/posts";
import { TPaginationQuery } from "@/types/types";

export const getPosts = async ({
  title,
  status,
  limit,
  page,
}: TPaginationQuery & TGetPosts) => {
  const skip = page && limit && (page - 1) * limit;
  return prisma.post.findMany({
    where: {
      title,
      status,
    },
    take: limit,
    skip,
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getPostById = async (id: number) => {
  return prisma.post.findUnique({
    where: {
      id,
    },
  });
};

export const countPosts = async ({ status, title }: TGetPosts = {}) => {
  return prisma.post.count({
    where: {
      status,
      title,
    },
  });
};

export const createPost = async ({
  title,
  cover,
  content,
  genreId,
  authorId,
}: TCreatePost) => {
  return prisma.post.create({
    data: {
      genreId,
      authorId,
      title,
      cover,
      content,
    },
  });
};

export const updatePost = async ({
  id,
  title,
  content,
  cover,
  genreId,
  authorId,
}: TUpdatePost) => {
  return prisma.post.update({
    where: {
      id,
    },
    data: {
      authorId,
      content,
      cover,
      genreId,
      title,
    },
  });
};

export const deletePost = async (id: number) => {
  return prisma.post.delete({
    where: {
      id,
    },
  });
};
