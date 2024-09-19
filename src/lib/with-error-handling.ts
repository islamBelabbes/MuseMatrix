import { NextRequest, NextResponse } from "next/server";
import { AppError, AuthError } from "./error";
import apiResponse, { TApiErrorResponse, TApiResponse } from "./api-response";
import { ZodError } from "zod";
import { flatZodError } from "./utils";
import { TApiHandler } from "@/types/types";

const withErrorHandler = <T extends object>(handler: TApiHandler<T>) => {
  return async (req: NextRequest, params: T) => {
    try {
      return await handler(req, params);
    } catch (error) {
      const response = apiResponse({
        success: false,
        status: 500,
        message: "an error occurred",
      }) as TApiErrorResponse;

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

      if (error instanceof AuthError) {
        response.message = error.message;
        response.status = error.statusCode;
      }

      return NextResponse.json(response, { status: response.status });
    }
  };
};

export default withErrorHandler;
