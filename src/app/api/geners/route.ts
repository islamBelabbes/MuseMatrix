import apiResponse from "@/lib/api-response";
import withErrorHandler from "@/lib/with-error-handling";
import { getGenresSchema } from "@/schema/genre";
import { getGenresUseCase } from "@/use-cases/genres";
import { NextRequest, NextResponse } from "next/server";

export async function getHandler(req: NextRequest) {
  const url = new URL(req.url);
  const title = url.searchParams.get("title") || undefined;
  const validatedBody = getGenresSchema.parse({ title });

  const genres = await getGenresUseCase(validatedBody);

  const response = apiResponse({
    success: true,
    status: 200,
    message: "genres fetched successfully",
    data: genres,
  });
  return NextResponse.json(response, { status: response.status });
}

export const GET = withErrorHandler(getHandler);
