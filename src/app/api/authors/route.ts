import apiResponse from "@/lib/api-response";
import withErrorHandling from "@/lib/with-error-handling";
import { getAuthorsSchema } from "@/schema/author";
import { getAuthorsUseCase } from "@/use-cases/authors";
import { NextRequest, NextResponse } from "next/server";

export async function getHandler(req: NextRequest) {
  const url = new URL(req.url);
  const name = url.searchParams.get("name") || undefined;
  const validatedBody = getAuthorsSchema.parse({ name });

  const authors = await getAuthorsUseCase(validatedBody);

  const response = apiResponse({
    success: true,
    status: 200,
    message: "authors fetched successfully",
    data: authors,
  });
  return NextResponse.json(response, { status: response.status });
}

export const GET = withErrorHandling(getHandler);
