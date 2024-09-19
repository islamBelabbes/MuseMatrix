import { NextRequest, NextResponse } from "next/server";
import { TApiResponse } from "./api-response";
import { TUser } from "@/dto/users";
import { AuthError } from "./error";
import { getCurrentUserUseCase } from "@/use-cases/auth";

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
    const user = await getCurrentUserUseCase();
    if (!user) throw new AuthError();

    return handler(req, params, user);
  };
};

export const withOptionalAuth = <T extends object>(
  handler: TApiHandlerWithOptionalAuth<T>,
) => {
  return async (req: NextRequest, params: T) => {
    const user = (await getCurrentUserUseCase()) ?? undefined;
    return handler(req, params, user);
  };
};

export default withAuth;
