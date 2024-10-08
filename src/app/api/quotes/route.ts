import { TUser } from "@/dto/users";
import apiResponse from "@/lib/api-response";
import withAuth from "@/lib/with-auth";
import withErrorHandler from "@/lib/with-error-handling";
import { createQuoteSchema } from "@/schema/quotes";
import { createQuoteUseCase } from "@/use-cases/quotes";
import { NextRequest, NextResponse } from "next/server";

const postHandler = async (req: NextRequest, params: {}, user: TUser) => {
  const body = (await req.json()) as unknown;
  const validatedBody = createQuoteSchema.parse(body);

  const quote = await createQuoteUseCase({ ...validatedBody, user });

  const response = apiResponse({
    success: true,
    message: "quote created successfully",
    status: 201,
    data: {
      id: quote.id,
    },
  });
  return NextResponse.json(response, { status: response.status });
};

export const POST = withErrorHandler(withAuth(postHandler));
