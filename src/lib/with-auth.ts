import { NextRequest, NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TApiResponse } from "./api-response";
import { TUser } from "@/dto/users";
import { AuthError } from "./error";

type TApiHandlerWithAuth<T extends object> = (
  req: NextRequest,
  params: T,
  user: TUser,
) => Promise<NextResponse<TApiResponse<unknown>> | Response>;

const withAuth = <T extends object>(handler: TApiHandlerWithAuth<T>) => {
  return async (req: NextRequest, params: T) => {
    const { isAuthenticated, getRoles, getUser } = getKindeServerSession();

    const user = await getUser();
    const roles = await getRoles();
    const isLoggedIn = await isAuthenticated();

    const _user: TUser = {
      ...user,
      roles: roles ?? [],
    };

    if (isLoggedIn) return await handler(req, params, _user);

    throw new AuthError();
  };
};

export default withAuth;
