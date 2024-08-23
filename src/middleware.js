import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware((auth, req) => {
  const isDashboard = createRouteMatcher(["/dashboard(.*)"]);
  if (!isDashboard(req)) return NextResponse.next();

  const isAuth = auth().userId;
  const isAdmin = auth().sessionClaims?.metadata.isAdmin;
  console.log(isAdmin);
  if (!isAuth) return auth().redirectToSignIn();
  if (!isAdmin) {
    return NextResponse.redirect(req.nextUrl.origin);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/dashboard(.*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
