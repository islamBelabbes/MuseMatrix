import { TUser } from "@/dto/users";
import apiResponse from "@/lib/api-response";
import withAuth from "@/lib/with-auth";
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
  { params }: { params: Promise<TParams> },
  user: TUser,
) => {
  const id = (await params).id;
  const body = await req.json();
  const validatedBody = updateQuoteSchema.parse({ ...body, id });

  const quote = await updateQuoteUseCase({ ...validatedBody, user });

  const response = apiResponse({
    success: true,
    message: "quote updated successfully",
    status: 200,
    data: quote,
  });
  return NextResponse.json(response, { status: response.status });
};

const deleteHandler = async (
  _: NextRequest,
  { params }: { params: Promise<TParams> },
  user: TUser,
) => {
  const _id = (await params).id;
  const id = IdSchema.parse(_id);

  await deleteQuoteUseCase(id, user);

  return new Response(null, { status: 204 });
};

export const PUT = withErrorHandler(withAuth(putHandler));
export const DELETE = withErrorHandler(withAuth(deleteHandler));
