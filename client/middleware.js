import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl

  // Protect routes that require authentication
  const protectedPaths = ["/dashboard", "/profile", "/templates/create", "/templates/edit", "/submissions"]

  // Admin-only routes
  const adminPaths = ["/admin", "/admin-utility"]

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  // Check if the path is admin-only
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path))

  // Redirect to login if trying to access protected route without being authenticated
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Redirect to unauthorized if trying to access admin route without admin role
  if (isAdminPath && (!token || token.role !== "admin")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/templates/create/:path*",
    "/templates/:id/edit/:path*",
    "/submissions/:path*",
    "/admin/:path*",
    "/admin-utility/:path*",
  ],
}

