import { createQuote, delateQuote, getQuotes } from "@/lib/db";
import prisma from "@/lib/prisma";

import {
  sendCreated,
  sendNoContent,
  sendOk,
  sendServerError,
} from "@/lib/responseHelper";

import { tryCatch } from "@/lib/utils";

export async function POST(req) {
  const { authorId, postId, quote, color } = await req.json();

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
  const [_, error] = await tryCatch(delateQuote(id));
  if (error) return sendServerError();
  return sendNoContent();
}
