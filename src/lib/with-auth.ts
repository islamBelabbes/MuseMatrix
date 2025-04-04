import { NextRequest, NextResponse } from "next/server";
import { TApiResponse } from "./api-response";
import { TUser } from "@/dto/users";
import { safeAsync } from "./safe";
import { getCurrentUser } from "./kinde-auth";

type TApiHandlerWithAuth<T extends Promise<object>> = (
  req: NextRequest,
  segmentData: { params: T },
  user: TUser,
) => Promise<NextResponse<TApiResponse<unknown>> | Response>;

type TApiHandlerWithOptionalAuth<T extends Promise<object>> = (
  req: NextRequest,
  segmentData: { params: T },
  user: TUser | undefined,
) => Promise<NextResponse<TApiResponse<unknown>> | Response>;

const withAuth = <T extends Promise<object>>(
  handler: TApiHandlerWithAuth<T>,
) => {
  return async (req: NextRequest, segmentData: { params: T }) => {
    const user = await getCurrentUser(); // this will throw if the user is not authenticated
    return handler(req, segmentData, user);
  };
};

export const withOptionalAuth = <T extends Promise<object>>(
  handler: TApiHandlerWithOptionalAuth<T>,
) => {
  return async (req: NextRequest, segmentData: { params: T }) => {
    const user = await safeAsync(getCurrentUser());

    let _user: TUser | undefined = undefined;
    if (user.success) _user = user.data;

    return handler(req, segmentData, _user);
  };
};

export default withAuth;
