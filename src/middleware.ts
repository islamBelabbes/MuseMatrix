import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserUseCase, isAdminUseCase } from "./use-cases/auth";
import { safeAsync } from "./lib/safe";

export async function middleware(request: NextRequest) {
  const user = await safeAsync(getCurrentUserUseCase());

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
