import { createGenre, getGenres } from "@/lib/db";
import {
  sendOk,
  sendServerError,
  sendUnauthorized,
} from "@/lib/responseHelper";
import { tryCatch } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const genre = searchParams.get("genre");

  const [data, error] = await tryCatch(getGenres(genre));

  if (error) return sendServerError();

  return sendOk({
    data,
  });
}

export async function POST(req) {
  const { title } = await req.json();

  const { sessionClaims } = auth();
  const isAdmin = sessionClaims?.metadata.isAdmin;
  if (!isAdmin)
    return sendUnauthorized({
      message: "you don't have permission to perform this action",
    });

  // creating author
  const [data, error] = await tryCatch(createGenre(title));
  if (error) return sendServerError();

  return sendOk({
    data,
  });
}
