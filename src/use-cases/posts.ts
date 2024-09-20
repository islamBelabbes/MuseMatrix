import {
  countPosts,
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "@/data-access/posts";
import { AppError, AuthError } from "@/lib/error";
import { safeAsync } from "@/lib/safe";
import { utapi } from "@/lib/upload-thing";
import {
  TCreatePost,
  TGetPostById,
  TGetPosts,
  TUpdatePost,
} from "@/schema/posts";
import { TQueryWithPagination } from "@/types/types";
import { revalidatePath } from "next/cache";
import { getGenreByIdUseCase } from "./genres";
import { getAuthorByIdUseCase } from "./authors";
import generatePagination from "@/lib/generate-pagination";
import { TUser } from "@/dto/users";
import { isAdminUseCase } from "@/use-cases/authorization";

export const getPostsUseCase = async ({
  status,
  title,
  genreId,
  limit,
  page,
}: TQueryWithPagination<TGetPosts> = {}) => {
  const countPromise = countPosts({ status, title });
  const dataPromise = getPosts({
    status,
    title,
    genreId,
    limit,
    page,
  });

  const [total, data] = await Promise.all([countPromise, dataPromise]);

  return {
    data,
    ...generatePagination({ total, page, limit }),
  };
};

export const getPostByIdUseCase = async ({ id, status }: TGetPostById) => {
  const post = await getPostById({ id, status });
  if (!post) throw new AppError("post not found", 404);

  return post;
};

export const createPostUseCase = async ({
  user,
  ...data
}: TCreatePost & { user: TUser }) => {
  if (!isAdminUseCase(user)) throw new AuthError();
  // make sure the genre and author exist
  const genrePromise = getGenreByIdUseCase(data.genreId);
  const authorPromise = getAuthorByIdUseCase(data.authorId);
  await Promise.all([genrePromise, authorPromise]); // this will throw if any of the relations doesn't exist

  const file = await utapi.uploadFiles(data.cover);
  if (file.error) throw new AppError("error occurred while uploading", 500);

  const post = await safeAsync(createPost({ ...data, cover: file.data.key }));
  if (!post.success) {
    await utapi.deleteFiles(file.data.key);
    throw post.error;
  }

  // TODO : use dependency injection for Nextjs specific Apis
  revalidatePath("/");
  revalidatePath(`/genre/${post.data.genreId}`);

  return post.data;
};

export const updatePostUseCase = async ({
  user,
  ...data
}: TUpdatePost & { user: TUser }) => {
  if (!isAdminUseCase(user)) throw new AuthError();

  const post = await getPostByIdUseCase({ id: data.id });

  // check if the genre and author exist if provided
  const genrePromise = data.genreId && getGenreByIdUseCase(data.genreId);
  const authorPromise = data.authorId && getAuthorByIdUseCase(data.authorId);
  await Promise.all([genrePromise, authorPromise].filter(Boolean)); // this will throw if any of the relations doesn't exist

  let cover: undefined | string;
  if (data.cover) {
    const file = await utapi.uploadFiles(data.cover);
    if (file.error) throw new AppError("error occurred while uploading", 500);
    cover = file.data.key;
    await utapi.deleteFiles(post.cover);
  }

  const updatedPost = await updatePost({
    ...data,
    cover,
  });

  // TODO : use dependency injection for Nextjs specific Apis
  revalidatePath("/");
  revalidatePath(`/genre/${updatedPost.genreId}`);
  revalidatePath(`/post/${updatedPost.id}`);

  return updatedPost;
};

export const deletePostUseCase = async (id: number, user: TUser) => {
  if (!isAdminUseCase(user)) throw new AuthError();

  const post = await getPostByIdUseCase({ id });

  // delete cover from UploadThing
  const deletedFile = await safeAsync(utapi.deleteFiles(post.cover));
  if (!deletedFile.success) throw new AppError("failed to delete file", 500);

  await deletePost(id);

  // TODO : use dependency injection for Nextjs specific Apis
  revalidatePath("/");
  revalidatePath(`/genre/${post.genreId}`);
  revalidatePath(`/post/${post.id}`);

  return true;
};
