import { authMiddleware } from "@clerk/nextjs";
import { PrivetRoutes } from "./constants/constants";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export default authMiddleware({
  publicRoutes: (req) => {
    let isPublic = true;
    for (let route of PrivetRoutes) {
      if (req.url.includes(route)) {
        isPublic = false;
      }
    }
    return isPublic;
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/(api|trpc)(.*)"],
};
