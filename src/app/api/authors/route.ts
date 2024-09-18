import apiResponse from "@/lib/api-response";
import { wait } from "@/lib/utils";
import withErrorHandler from "@/lib/with-error-handling";
import { createAuthorSchema, getAuthorsSchema } from "@/schema/author";
import { PaginationSchema } from "@/schema/schema";
import { createAuthorUseCase, getAuthorsUseCase } from "@/use-cases/authors";
import { NextRequest, NextResponse } from "next/server";

async function getHandler(req: NextRequest) {
  const url = new URL(req.url);
  const name = url.searchParams.get("name") ?? undefined;
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");

  const pagination = PaginationSchema.parse({ page, limit });
  const validatedBody = getAuthorsSchema.parse({ name });

  const authors = await getAuthorsUseCase({ ...validatedBody, ...pagination });

  const response = apiResponse({
    success: true,
    status: 200,
    message: "authors fetched successfully",
    data: authors,
  });
  return NextResponse.json(response, { status: response.status });
}

async function postHandler(req: NextRequest) {
  const formData = await req.formData();
  const body = {
    name: formData.get("name") ?? undefined,
    avatar: formData.get("avatar"),
  };

  const validatedBody = createAuthorSchema.parse(body);

  const author = await createAuthorUseCase(validatedBody);

  const response = apiResponse({
    success: true,
    status: 201,
    message: "author created successfully",
    data: author,
  });
  return NextResponse.json(response, { status: response.status });
}

export const GET = withErrorHandler(getHandler);
export const POST = withErrorHandler(postHandler);
