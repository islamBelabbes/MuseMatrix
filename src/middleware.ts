import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserUseCase, isAdminUseCase } from "./use-cases/auth";

export async function middleware(request: NextRequest) {
  const user = await getCurrentUserUseCase();

  if (!user) {
    const url = new URL("/api/auth/login", request.url);
    return NextResponse.redirect(url);
  }

  if (!isAdminUseCase(user)) {
    return NextResponse.error();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
