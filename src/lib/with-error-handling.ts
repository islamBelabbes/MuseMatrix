import { NextRequest, NextResponse } from "next/server";
import { AppError } from "./error";
import { ApiResponse } from "./api-response";
import { ZodError } from "zod";
import { flatZodError } from "./utils";

type ApiHandler<T extends object> = (
  req: NextRequest,
  params: T,
) => Promise<NextResponse<ApiResponse<unknown>> | Response>;

const withErrorHandling = <T extends object>(handler: ApiHandler<T>) => {
  return async (req: NextRequest, params: T) => {
    try {
      return await handler(req, params);
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) {
        return NextResponse.json(error.message, { status: error.statusCode });
      }

      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            validationErrors: flatZodError(error),
          },
          { status: 400 },
        );
      }

      return NextResponse.json("an error occurred", { status: 500 });
    }
  };
};

export default withErrorHandling;
