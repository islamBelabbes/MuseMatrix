import { TUser } from "@/dto/users";
import apiResponse from "@/lib/api-response";
import withAuth from "@/lib/with-auth";
import withErrorHandler from "@/lib/with-error-handling";
import { createGenreSchema, getGenresSchema } from "@/schema/genre";
import { PaginationSchema } from "@/schema/schema";
import { createGenreUseCase, getGenresUseCase } from "@/use-cases/genres";
import { NextRequest, NextResponse } from "next/server";

async function getHandler(req: NextRequest) {
  const url = new URL(req.url);
  const title = url.searchParams.get("title") ?? undefined;
  const page = url.searchParams.get("page");
  const limit = url.searchParams.get("limit");

  const pagination = PaginationSchema.parse({ page, limit });
  const validatedBody = getGenresSchema.parse({ title });

  const genres = await getGenresUseCase({ ...validatedBody, ...pagination });

  const response = apiResponse({
    success: true,
    status: 200,
    message: "genres fetched successfully",
    data: genres,
  });
  return NextResponse.json(response, { status: response.status });
}

async function postHandler(req: NextRequest, _: any, user: TUser) {
  const body = (await req.json()) as unknown;
  const validatedBody = createGenreSchema.parse(body);

  const genre = await createGenreUseCase({ ...validatedBody, user });

  const response = apiResponse({
    success: true,
    status: 201,
    message: "genre created successfully",
    data: genre,
  });

  return NextResponse.json(response, { status: response.status });
}

export const GET = withErrorHandler(withAuth(getHandler));
export const POST = withErrorHandler(withAuth(postHandler));
