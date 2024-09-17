import { NextRequest, NextResponse } from "next/server";
import { AppError } from "./error";
import apiResponse, { ApiErrorResponse, ApiResponse } from "./api-response";
import { ZodError } from "zod";
import { flatZodError } from "./utils";

type ApiHandler<T extends object> = (
  req: NextRequest,
  params: T,
) => Promise<NextResponse<ApiResponse<unknown>> | Response>;

const withErrorHandler = <T extends object>(handler: ApiHandler<T>) => {
  return async (req: NextRequest, params: T) => {
    try {
      return await handler(req, params);
    } catch (error) {
      const response = apiResponse({
        success: false,
        status: 500,
        message: "an error occurred",
      }) as ApiErrorResponse;

      console.log("from error handler: ", error);
      if (error instanceof AppError) {
        response.message = error.message;
        if (error.statusCode) {
          response.status = error.statusCode;
        }
      }

      if (error instanceof ZodError) {
        response.message = "validation Errors";
        response.status = 400;
        response.errors = flatZodError(error);
      }

      return NextResponse.json(response, { status: response.status });
    }
  };
};

export default withErrorHandler;
