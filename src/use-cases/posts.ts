import {
  countPosts,
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "@/data-access/posts";
import { AppError } from "@/lib/error";
import { safeAsync } from "@/lib/safe";
import { utapi } from "@/lib/upload-thing";
import { uploadThingGetFileKeyFromUrl } from "@/lib/utils";
import { TCreatePost, TGetPosts, TUpdatePost } from "@/schema/posts";
import { TPaginationQuery } from "@/types/types";
import { revalidateTag } from "next/cache";

export const getPostsUseCase = async ({
  status,
  title,
  limit = 5,
  page = 1,
}: TPaginationQuery & TGetPosts = {}) => {
  const countPromise = countPosts({ status, title });
  const dataPromise = getPosts({
    status,
    title,
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

export const createPostUseCase = (data: TCreatePost) => {
  return createPost(data);
};

export const updatePostUseCase = (data: TUpdatePost) => {
  return updatePost(data);
};

export const deletePostUseCase = async (id: number) => {
  const post = await getPost({ id });
  if (!post) throw new AppError("post not found", 404);

  const fileKey = uploadThingGetFileKeyFromUrl(post.cover);
  if (fileKey) {
    // delete cover from UploadThing
    const deletedFile = await safeAsync(utapi.deleteFiles(fileKey));
    if (!deletedFile.success) throw new AppError("failed to delete file", 500);

    await deletePost({ id });
    revalidateTag("posts_listing");
    return true;
  }
};
