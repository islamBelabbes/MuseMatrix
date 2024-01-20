import { createQuote, delateQuote, getQuotes, updateQuote } from "@/lib/db";

import {
  sendCreated,
  sendNoContent,
  sendOk,
  sendServerError,
} from "@/lib/responseHelper";

import { removeEmptyObjectValues, tryCatch } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";

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

  if (error) return sendServerError();

  return sendCreated({
    message: "quote created successfully",
    data,
  });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const [data, error] = await tryCatch(getQuotes({ id }));
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

  const [_, error] = await tryCatch(delateQuote(id));
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
    authorId: body.authorId,
    postId: body.postId,
    quote: body.quote,
    color: body.color,
  };

  const query = removeEmptyObjectValues(fieldsToUpdate);

  const [_, error] = await tryCatch(updateQuote(parseInt(body.id), query));
  if (error) return sendServerError();

  return sendNoContent();
}
