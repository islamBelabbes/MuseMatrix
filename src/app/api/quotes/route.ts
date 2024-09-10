import apiResponse from "@/lib/api-response";
import withErrorHandler from "@/lib/with-error-handling";
import { createQuoteSchema } from "@/schema/quotes";
import { createQuoteUseCase } from "@/use-cases/quotes";
import { NextRequest, NextResponse } from "next/server";

const postHandler = async (req: NextRequest) => {
  const body = await req.json();
  const validatedBody = createQuoteSchema.parse(body);

  await createQuoteUseCase(validatedBody);

  const response = apiResponse({
    success: true,
    message: "quote created successfully",
    status: 201,
  });
  return NextResponse.json(response, { status: response.status });
};

export const POST = withErrorHandler(postHandler);
