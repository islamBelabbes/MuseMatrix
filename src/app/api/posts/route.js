import { createPost, getPosts, updatePost } from "@/lib/db";
import {
  sendNoContent,
  sendOk,
  sendServerError,
  sendUnauthorized,
} from "@/lib/responseHelper";
import {
  dataURLtoFile,
  tryCatch,
  uploadThingGetFileKeyFromUrl,
} from "@/lib/utils";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { utapi } from "@/lib/uploadThing";
import { currentUser } from "@clerk/nextjs";
export async function POST(req) {
  const { genre, author, title, cover, content, status } = await req.json();

  const user = await currentUser();
  const isAdmin = user?.publicMetadata.isAdmin;
  if (!isAdmin)
    return sendUnauthorized({
      message: "you don't have permission to perform this action",
    });

  // convert dataUrl fo File Object
  const file = dataURLtoFile(cover, `${crypto.randomUUID()}.jpg`);

  // Uploading Post Media
  const [data, error] = await tryCatch(utapi.uploadFiles([file]));
  if (error) return sendServerError();

  // Create Post
  const [postData, postError] = await tryCatch(
    createPost({
      genre,
      author,
      title,
      cover: data[0]?.data?.url,
      content,
      status,
    })
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

  const user = await currentUser();
  const isAdmin = user?.publicMetadata.isAdmin;
  if (!isAdmin)
    return sendUnauthorized({
      message: "you don't have permission to perform this action",
    });

  // get Cover (file) Url
  const [fileData, fileError] = await tryCatch(
    prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        cover: true,
      },
    })
  );
  if (fileError) sendServerError();

  // get file key - uploadThing
  const fileKey = uploadThingGetFileKeyFromUrl(fileData?.cover);
  if (fileKey) {
    // delete cover from UploadThing
    const [__, fileDeleteError] = await tryCatch(utapi.deleteFiles(fileKey));
    if (fileDeleteError) return sendServerError();
  }

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
  const { id, content, cover, title, genre, author, status } = await req.json();

  const user = await currentUser();
  const isAdmin = user?.publicMetadata.isAdmin;
  if (!isAdmin)
    return sendUnauthorized({
      message: "you don't have permission to perform this action",
    });

  const fields = {
    cover,
    title,
    genreId: genre,
    authorId: author,
    content,
    status,
  };
  const [_, error] = await tryCatch(updatePost(id, fields));

  if (error) return sendServerError();

  revalidatePath(`/post/${id}`);

  return sendNoContent();
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const limit = parseInt(searchParams.get("limit")) || 2;
  const page = parseInt(searchParams.get("page")) || 1;
  const status = searchParams.get("status");

  const [data, error] = await tryCatch(
    getPosts({
      title,
      limit,
      page,
      status,
    })
  );

  if (error) return sendServerError();

  const { result, ...pagination } = data;
  return sendOk({ data: result, ...pagination });
}
