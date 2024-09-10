import apiResponse from "@/lib/api-response";
import withErrorHandling from "@/lib/with-error-handling";
import { updatePostSchema } from "@/schema/posts";
import { IdSchema } from "@/schema/schema";
import { deletePostUseCase, updatePostUseCase } from "@/use-cases/posts";
import { NextRequest, NextResponse } from "next/server";

export async function putHandler(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const formData = await req.formData();
  const body = {
    id,
    title: formData.get("title") || undefined,
    content: formData.get("content") || undefined,
    cover: formData.get("cover") || undefined,
    genreId: formData.get("genreId"),
    authorId: formData.get("authorId"),
  };

  const validatedBody = updatePostSchema.parse(body);

  await updatePostUseCase(validatedBody);
  return NextResponse.json(
    apiResponse({
      success: true,
      message: "post updated successfully",
      status: 200,
    }),
  );
}

export async function deleteHandler(
  _: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  const _id = IdSchema.parse(id);

  await deletePostUseCase(_id);
  return new Response(null, { status: 204 });
}

export const PUT = withErrorHandling(putHandler);
export const DELETE = withErrorHandling(deleteHandler);
