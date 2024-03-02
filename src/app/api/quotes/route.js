import { createQuote, DeleteQuote, getQuotes, updateQuote } from "@/lib/db";

import {
  sendCreated,
  sendNoContent,
  sendOk,
  sendServerError,
  sendUnauthorized,
} from "@/lib/responseHelper";

import { tryCatch } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const { authorId, postId, quote, color } = await req.json();

  const user = await currentUser();
  const isAdmin = user?.publicMetadata.isAdmin;
  if (!isAdmin)
    return sendUnauthorized({
      message: "you don't have permission to perform this action",
    });

  const [data, error] = await tryCatch(
    createQuote({ authorId, postId, quote, color })
  );

  revalidatePath("/quotes");
  if (error) return sendServerError();

  return sendCreated({
    message: "quote created successfully",
    data,
  });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const limit = parseInt(searchParams.get("limit")) || 2;
  const page = parseInt(searchParams.get("page")) || 1;

  const [data, error] = await tryCatch(getQuotes({ id, limit, page }));
  if (error) return sendServerError();

  return sendOk({ data });
}

export async function DELETE(req) {
  const { id } = await req.json();

  const user = await currentUser();
  const isAdmin = user?.publicMetadata.isAdmin;
  if (!isAdmin)
    return sendUnauthorized({
      message: "you don't have permission to perform this action",
    });

  const [_, error] = await tryCatch(DeleteQuote(id));
  revalidatePath("/quotes");
  if (error) return sendServerError();
  return sendNoContent();
}

export async function PUT(req) {
  const body = await req.json();

  const user = await currentUser();
  const isAdmin = user?.publicMetadata.isAdmin;
  if (!isAdmin)
    return sendUnauthorized({
      message: "you don't have permission to perform this action",
    });

  const fieldsToUpdate = {
    authorId: body?.authorId || null,
    postId: body?.postId || null,
    quote: body?.quote || null,
    color: body?.color || null,
  };

  const [_, error] = await tryCatch(
    updateQuote(parseInt(body.id), fieldsToUpdate)
  );

  revalidatePath("/quotes");
  if (error) return sendServerError();

  return sendNoContent();
}
