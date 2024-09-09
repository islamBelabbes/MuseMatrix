import apiResponse from "@/lib/api-response";
import { getAuthorsUseCase } from "@/use-cases/authors";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authors = await getAuthorsUseCase();

  const response = apiResponse({
    success: true,
    status: 200,
    message: "authors fetched successfully",
    data: authors,
  });
  return NextResponse.json(response, {
    status: response.status,
  });
}
