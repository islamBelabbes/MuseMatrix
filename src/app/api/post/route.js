import { createPost, getPosts } from "@/lib/db";
import { sendNoContent, sendOk, sendServerError } from "@/lib/responseHelper";
import { UTApi } from "uploadthing/server";
export const utapi = new UTApi();
import { dataURLtoFile, tryCatch } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
export async function POST(req) {
  const { genre, author, title, cover, content } = await req.json();

  // convert dataUrl fo File Object
  const file = dataURLtoFile(cover, `${crypto.randomUUID()}.jpg`);

  // Uploading Post Media
  const [data, error] = await tryCatch(utapi.uploadFiles([file]));
  if (error) return sendServerError();

  // Create Post
  const [postData, postError] = await tryCatch(
    createPost({ genre, author, title, cover: data[0]?.data?.url, content })
  );
  if (postError) {
    await tryCatch(utapi.deleteFiles(data[0]?.data?.key));
    return sendServerError();
  }
  return sendOk({
    data: postData,
  });
}

export async function DELETE(req) {
  const { id } = await req.json();
  const [_, error] = await tryCatch(
    prisma.post.delete({
      where: {
        id,
      },
    })
  );
  if (error) return sendServerError();
  return sendNoContent();
}

export async function PUT(req) {
  const { id, content, cover, title, genre, author } = await req.json();

  // check for fields to update
  const fields = { cover, title, genreId: genre, authorId: author };

  const query = Object.keys(fields).reduce(
    (acc, filter) => {
      if (fields[filter]) {
        acc = { ...acc, [filter]: fields[filter] };
      }
      return acc;
    },
    { content }
  );

  const [_, error] = await tryCatch(
    prisma.post.update({
      where: {
        id,
      },
      data: query,
    })
  );
  if (error) {
    console.log(error);
    return sendServerError();
  }
  revalidatePath(`/post/${id}`);
  return sendNoContent();
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const [data, error] = await tryCatch(getPosts(title));
  console.log(error);
  if (error) return sendServerError();
  return sendOk({ data });
}
