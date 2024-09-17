import apiResponse from "@/lib/api-response";
import withErrorHandler from "@/lib/with-error-handling";
import { createPostSchema, getPostsSchema } from "@/schema/posts";
import { PaginationSchema } from "@/schema/schema";
import { createPostUseCase, getPostsUseCase } from "@/use-cases/posts";
import { NextRequest, NextResponse } from "next/server";

async function getHandler(req: NextRequest) {
  const url = new URL(req.url);
  const status = "Published";
  const title = url.searchParams.get("title") ?? undefined;
  const genreId = url.searchParams.get("genreId") ?? undefined;
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");

  const validatedBody = getPostsSchema.parse({ status, title, genreId });
  const pagination = PaginationSchema.parse({ page, limit });

  const posts = await getPostsUseCase({ ...validatedBody, ...pagination });

  const response = apiResponse({
    success: true,
    status: 200,
    message: "posts fetched successfully",
    data: posts,
  });
  return NextResponse.json(response, { status: response.status });
}

async function postHandler(req: NextRequest) {
  const formData = await req.formData();
  const body = {
    title: formData.get("title") ?? undefined,
    content: formData.get("content") ?? undefined,
    cover: formData.get("cover"),
    genreId: formData.get("genreId"),
    authorId: formData.get("authorId"),
    status: formData.get("status"),
  };

  const validatedBody = createPostSchema.parse(body);

  const post = await createPostUseCase(validatedBody);

  const response = apiResponse({
    success: true,
    message: "post created successfully",
    status: 201,
    data: post,
  });
  return NextResponse.json(response, { status: response.status });
}

export const GET = withErrorHandler(getHandler);
export const POST = withErrorHandler(postHandler);
