import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return withAuth(request) as unknown;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
