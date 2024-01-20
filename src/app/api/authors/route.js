import { createAuthor, getAuthors } from "@/lib/db";
import { sendOk, sendServerError } from "@/lib/responseHelper";
import { UTApi } from "uploadthing/server";
export const utapi = new UTApi();
import { dataURLtoFile, tryCatch } from "@/lib/utils";
export async function POST(req) {
  const { name, avatar } = await req.json();

  // convert dataUrl fo File Object
  const file = dataURLtoFile(avatar, `${crypto.randomUUID()}.jpg`);

  console.log("file", file);
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
