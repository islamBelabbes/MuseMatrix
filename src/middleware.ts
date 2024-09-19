import { authMiddleware } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "./lib/utils";
import { usersDtoMapper } from "./dto/users";

export async function middleware(request: NextRequest) {
  const { getRoles, getUser } = getKindeServerSession();

  const [user, roles] = await Promise.all([getUser(), getRoles()]);

  const _user = usersDtoMapper({ ...user, roles: roles ?? [] });
  if (!isAdmin(_user)) {
    return !user
      ? NextResponse.redirect(new URL("/api/auth/login", request.url))
      : NextResponse.error();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
