import apiResponse from "@/lib/api-response";
import { getAuthorsSchema } from "@/schema/author";
import { getAuthorsUseCase } from "@/use-cases/authors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get("name") || undefined;
    const validatedData = getAuthorsSchema.parse({ name });

    const authors = await getAuthorsUseCase(validatedData);

    const response = apiResponse({
      success: true,
      status: 200,
      message: "authors fetched successfully",
      data: authors,
    });
    return NextResponse.json(response, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json("an error occurred", { status: 500 });
  }
}
