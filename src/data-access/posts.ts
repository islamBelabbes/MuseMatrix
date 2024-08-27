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

export const getPost = async ({ id }: { id: number }) => {
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
  genre,
  author,
  title,
  cover,
  content,
}: TCreatePost) => {
  return prisma.post.create({
    data: {
      genreId: genre,
      authorId: author,
      title,
      cover,
      content,
    },
  });
};

export const updatePost = async ({
  author,
  content,
  cover,
  genre,
  id,
  title,
}: TUpdatePost) => {
  return prisma.post.update({
    where: {
      id,
    },
    data: {
      authorId: author,
      content,
      cover,
      genreId: genre,
      title,
    },
  });
};

export const deletePost = async ({ id }: { id: number }) => {
  return prisma.post.delete({
    where: {
      id,
    },
  });
};
