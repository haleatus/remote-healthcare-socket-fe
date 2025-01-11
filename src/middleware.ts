import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware is running:", req.nextUrl.pathname);

  const authToken = req.cookies.get("authToken");

  const adminAuthToken = req.cookies.get("adminAuthToken");

  const protectedUserRoutes = ["/doctors", "/profile"];

  const protectedAdminRoutes = ["/admin"];

  const currentPath = req.nextUrl.pathname;

  const isProtectedUserRoute = protectedUserRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  const isProtectedAdminRoute = protectedAdminRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (isProtectedUserRoute && !authToken) {
    return NextResponse.redirect("/signin");
  }

  if (isProtectedAdminRoute && !adminAuthToken) {
    return NextResponse.redirect("/admin/signin");
  }

  // Redirect authenticated users away from signin pages
  if (authToken) {
    if (currentPath.startsWith("/signin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (adminAuthToken) {
    if (currentPath.startsWith("/admin/signin")) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/doctors/:path*", "/profile/:path*", "/signin", "/admin/:path*"],
};
