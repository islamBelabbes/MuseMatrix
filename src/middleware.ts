import { NextRequest, NextResponse } from "next/server";
import { isAdminUseCase } from "./use-cases/authorization";
import { safeAsync } from "./lib/safe";
import { getCurrentUser } from "./lib/kinde-auth";

export async function middleware(request: NextRequest) {
  const user = await safeAsync(getCurrentUser());

  if (!user.success) {
    const url = new URL("/api/auth/login", request.url);
    return NextResponse.redirect(url);
  }

  if (!isAdminUseCase(user.data)) {
    return NextResponse.error();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
