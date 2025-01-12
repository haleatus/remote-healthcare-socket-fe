import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("accessToken");
  const adminAuthToken = req.cookies.get("adminAccessToken");

  const protectedUserRoutes = ["/doctors", "/profile"];
  const protectedAdminRoutes = ["/admin"];
  const currentPath = req.nextUrl.pathname;

  const isProtectedUserRoute = protectedUserRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  const isProtectedAdminRoute = protectedAdminRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  // Create absolute URLs using req.url as the base
  if (isProtectedUserRoute && !authToken) {
    const redirectUrl = new URL("/signin", req.url);
    redirectUrl.searchParams.set("message", "unauthorized");
    return NextResponse.redirect(redirectUrl);
  }

  if (isProtectedAdminRoute && !adminAuthToken) {
    const redirectAdminUrl = new URL("/admin-signin", req.url);
    redirectAdminUrl.searchParams.set("message", "unauthorized-admin");
    return NextResponse.redirect(redirectAdminUrl);
  }

  // Redirect authenticated users away from signin pages
  if (authToken && currentPath.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (adminAuthToken && currentPath.startsWith("/admin-signin")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/doctors/:path*", "/profile/:path*", "/signin", "/admin/:path*"],
};
