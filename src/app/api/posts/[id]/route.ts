import { TUser } from "@/dto/users";
import apiResponse from "@/lib/api-response";
import withAuth from "@/lib/with-auth";
import withErrorHandler from "@/lib/with-error-handling";
import { updatePostSchema } from "@/schema/posts";
import { IdSchema } from "@/schema/schema";
import { deletePostUseCase, updatePostUseCase } from "@/use-cases/posts";
import { NextRequest, NextResponse } from "next/server";

async function putHandler(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
  user: TUser,
) {
  const formData = await req.formData();
  const body = {
    id,
    title: formData.get("title") || undefined,
    content: formData.get("content") ?? undefined,
    genreId: formData.get("genreId") ?? undefined,
    authorId: formData.get("authorId") ?? undefined,
    status: formData.get("status") ?? undefined,
    cover: formData.get("cover") ?? undefined,
  };

  const validatedBody = updatePostSchema.parse(body);

  const post = await updatePostUseCase({ ...validatedBody, user });

  const response = apiResponse({
    success: true,
    message: "post updated successfully",
    status: 200,
    data: post,
  });
  return NextResponse.json(response, { status: response.status });
}

async function deleteHandler(
  _: NextRequest,
  { params: { id } }: { params: { id: string } },
  user: TUser,
) {
  const _id = IdSchema.parse(id);

  await deletePostUseCase(_id, user);
  return new Response(null, { status: 204 });
}

export const PUT = withErrorHandler(withAuth(putHandler));
export const DELETE = withErrorHandler(withAuth(deleteHandler));
