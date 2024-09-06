import {
  countPosts,
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "@/data-access/posts";
import { AppError } from "@/lib/error";
import { safeAsync } from "@/lib/safe";
import { utapi } from "@/lib/upload-thing";
import { uploadThingGetFileKeyFromUrl } from "@/lib/utils";
import {
  TCreatePost,
  TGetPostById,
  TGetPosts,
  TUpdatePost,
} from "@/schema/posts";
import { TPaginationQuery } from "@/types/types";
import { revalidateTag } from "next/cache";
import { getGenreByIdUseCase } from "./genres";
import { getAuthorByIdUseCase } from "./authors";

export const getPostsUseCase = async ({
  status,
  title,
  genreId,
  limit = 5,
  page = 1,
}: TPaginationQuery & TGetPosts = {}) => {
  const countPromise = countPosts({ status, title });
  const dataPromise = getPosts({
    status,
    title,
    genreId,
    limit,
    page,
  });

  const [count, data] = await Promise.all([countPromise, dataPromise]);
  const totalPages = Math.ceil(count / limit);

  return {
    data,
    count,
    totalPages,
    hasNext: page < totalPages,
  };
};

export const getPostByIdUseCase = async ({ id, status }: TGetPostById) => {
  const post = await getPostById({ id, status });
  if (!post) throw new AppError("post not found", 404);

  return post;
};

export const createPostUseCase = async (data: TCreatePost) => {
  // make sure the genre and author exist
  const genrePromise = safeAsync(getGenreByIdUseCase(data.genreId));
  const authorPromise = safeAsync(getAuthorByIdUseCase(data.authorId));
  const [genre, author] = await Promise.all([genrePromise, authorPromise]);

  if (!genre.success) {
    throw genre.error;
  }

  if (!author.success) {
    throw author.error;
  }

  const file = await utapi.uploadFiles(data.cover);
  if (file.error) throw new AppError("error occurred while uploading", 500);

  const post = await safeAsync(createPost({ ...data, cover: file.data.key }));
  if (!post.success) {
    await utapi.deleteFiles(file.data.key);
    throw post.error;
  }

  return post.data;
};

export const updatePostUseCase = (data: TUpdatePost) => {
  // return updatePost(data);
};

export const deletePostUseCase = async (id: number) => {
  const post = await getPostById({ id });
  if (!post) throw new AppError("post not found", 404);

  const fileKey = uploadThingGetFileKeyFromUrl(post.cover);
  if (fileKey) {
    // delete cover from UploadThing
    const deletedFile = await safeAsync(utapi.deleteFiles(fileKey));
    if (!deletedFile.success) throw new AppError("failed to delete file", 500);

    await deletePost(id);
    revalidateTag("posts_listing");
    return true;
  }

  return true;
};
