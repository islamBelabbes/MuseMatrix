import apiResponse from "@/lib/api-response";
import { AppError } from "@/lib/error";
import withErrorHandling from "@/lib/with-error-handling";
import { createPostSchema } from "@/schema/posts";
import { createPostUseCase } from "@/use-cases/posts";
import { NextRequest, NextResponse } from "next/server";

export async function getHandler() {
  return new Response(null, {
    status: 204,
  });
}

export async function postHandler(req: NextRequest) {
  const formData = await req.formData();
  const body = {
    title: formData.get("title") || undefined,
    content: formData.get("content") || undefined,
    cover: formData.get("cover"),
    genreId: formData.get("genreId"),
    authorId: formData.get("authorId"),
  };

  const validatedBody = createPostSchema.parse(body);

  await createPostUseCase(validatedBody);

  const response = apiResponse({
    success: true,
    message: "post created successfully",
    status: 200,
  });
  return NextResponse.json(response, { status: response.status });
}

export const GET = withErrorHandling(getHandler);
export const POST = withErrorHandling(postHandler);
