import { createAuthor, getAuthors } from "@/lib/db";
import {
  sendOk,
  sendServerError,
  sendUnauthorized,
} from "@/lib/responseHelper";
import { UTApi } from "uploadthing/server";
export const utapi = new UTApi();
import { dataURLtoFile, tryCatch } from "@/lib/utils";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const authorName = searchParams.get("name");

  const [data, error] = await tryCatch(getAuthors(authorName));

  if (error) {
    console.log(error);
    return sendServerError();
  }

  return sendOk({
    data,
  });
}

export async function POST(req) {
  const { name, avatar } = await req.json();

  const { sessionClaims } = auth();
  const isAdmin = sessionClaims?.publicMetadata.isAdmin;
  if (!isAdmin)
    return sendUnauthorized({
      message: "you don't have permission to perform this action",
    });
  // convert dataUrl fo File Object
  const file = dataURLtoFile(avatar, `${crypto.randomUUID()}.jpg`);

  // Uploading avatar Media
  const [data, error] = await tryCatch(utapi.uploadFiles([file]));
  if (error) {
    console.log("error uploading ");
    return sendServerError();
  }

  const authorAvatar = data[0]?.data?.url;

  // creating author
  const [authorData, authorError] = await tryCatch(
    createAuthor({ name, avatar: authorAvatar })
  );
  if (authorError) return sendServerError();

  return sendOk({
    data: authorData,
  });
}
