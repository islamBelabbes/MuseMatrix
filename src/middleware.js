import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const password = request.cookies.get("mx_password")?.value;
  if (password !== "123" && request.pathname !== "/not-found") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else {
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
