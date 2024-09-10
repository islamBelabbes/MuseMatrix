import apiResponse from "@/lib/api-response";
import withErrorHandler from "@/lib/with-error-handling";
import { updateQuoteSchema } from "@/schema/quotes";
import { IdSchema } from "@/schema/schema";
import { deleteQuoteUseCase, updateQuoteUseCase } from "@/use-cases/quotes";
import { NextRequest, NextResponse } from "next/server";

type TParams = {
  id: string;
};

const putHandler = async (
  req: NextRequest,
  { params: { id } }: { params: TParams },
) => {
  const body = await req.json();
  const validatedBody = updateQuoteSchema.parse({ ...body, id });

  await updateQuoteUseCase(validatedBody);

  const response = apiResponse({
    success: true,
    message: "quote updated successfully",
    status: 200,
  });
  return NextResponse.json(response, { status: response.status });
};

const deleteHandler = async (
  _: NextRequest,
  { params: { id } }: { params: TParams },
) => {
  const _id = IdSchema.parse(id);

  await deleteQuoteUseCase(_id);

  return new Response(null, { status: 204 });
};

export const PUT = withErrorHandler(putHandler);
export const DELETE = withErrorHandler(deleteHandler);
