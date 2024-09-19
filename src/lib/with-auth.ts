import { NextRequest, NextResponse } from "next/server";
import { TApiResponse } from "./api-response";
import { TUser } from "@/dto/users";
import { AuthError } from "./error";
import { getCurrentUserUseCase } from "@/use-cases/auth";
import { safeAsync } from "./safe";

type TApiHandlerWithAuth<T extends object> = (
  req: NextRequest,
  params: T,
  user: TUser,
) => Promise<NextResponse<TApiResponse<unknown>> | Response>;

type TApiHandlerWithOptionalAuth<T extends object> = (
  req: NextRequest,
  params: T,
  user: TUser | undefined,
) => Promise<NextResponse<TApiResponse<unknown>> | Response>;

const withAuth = <T extends object>(handler: TApiHandlerWithAuth<T>) => {
  return async (req: NextRequest, params: T) => {
    const user = await getCurrentUserUseCase(); // this will throw if the user is not authenticated
    return handler(req, params, user);
  };
};

export const withOptionalAuth = <T extends object>(
  handler: TApiHandlerWithOptionalAuth<T>,
) => {
  return async (req: NextRequest, params: T) => {
    const user = await safeAsync(getCurrentUserUseCase());

    let _user: TUser | undefined = undefined;
    if (user.success) _user = user.data;

    return handler(req, params, _user);
  };
};

export default withAuth;
