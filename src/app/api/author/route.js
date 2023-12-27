import { createAuthor, getAuthors } from "@/lib/db";
import { sendOk, sendServerError } from "@/lib/responseHelper";
import { UTApi } from "uploadthing/server";
export const utapi = new UTApi();
import { dataURLtoFile, tryCatch } from "@/lib/utils";
export async function POST(req) {
  const { name, avatar } = await req.json();

  // convert dataUrl fo File Object
  const file = dataURLtoFile(avatar, `${crypto.randomUUID()}.jpg`);

  // Uploading Post Media
  const [data, error] = await tryCatch(utapi.uploadFiles([file]));
  if (error) {
    console.log("error uploading ");
    return sendServerError();
  }

  // creating author
  const [authorData, authorError] = await tryCatch(
    createAuthor({ name, avatar: data[0]?.data?.url })
  );
  if (authorError) return sendServerError();

  return sendOk({
    data: authorData,
  });
}

export async function GET(req) {
  const [data, error] = await tryCatch(getAuthors());

  if (error) return sendServerError();

  return sendOk({
    data,
  });
}
