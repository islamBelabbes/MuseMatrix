import { postsDtoMapper } from "@/dtos/posts";
import prisma from "@/lib/prisma";
import { TCreatePost, TGetPosts, TUpdatePost } from "@/schema/posts";
import { TPaginationQuery } from "@/types/types";

export const getPosts = async ({
  title,
  status,
  genreId,
  limit,
  page,
}: TPaginationQuery & TGetPosts) => {
  const skip = page && limit && (page - 1) * limit;

  const post = await prisma.post.findMany({
    where: {
      title,
      status,
      genreId,
    },
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

export const getPostById = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      genre: true,
    },
  });

  if (!post) return null;
  return postsDtoMapper(post);
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
  const post = await prisma.post.create({
    data: {
      genreId,
      authorId,
      title,
      cover,
      content,
    },
    include: {
      genre: true,
      author: true,
    },
  });

  return postsDtoMapper(post);
};

export const updatePost = async ({
  id,
  title,
  content,
  cover,
  genreId,
  authorId,
}: TUpdatePost) => {
  const post = await prisma.post.update({
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
