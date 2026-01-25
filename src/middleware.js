import { NextResponse } from "next/server"
import { decodeJwt } from "@/utils/utils"

export function middleware(req) {
  const path = req.nextUrl.pathname
  // Get the access token from cookies
  const accessToken = req.cookies.get("accessToken")?.value

  // Public routes that don't require authentication
  const publicPaths = ["/login", "/forgot-password", "/reset-password"]

  // 🚩 1. Redirect unauthenticated users trying to access protected routes
  if (!accessToken && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (accessToken) {
    try {
      const decodedJwt = decodeJwt(accessToken)
      const isExpired = decodedJwt.exp * 1000 < Date.now()
      const role = decodedJwt.role

      // ⏱️ 2. If token is expired, clear it and go to login
      if (isExpired) {
        console.warn("Token has expired")
        return NextResponse.redirect(new URL("/login", req.url))
      }

      // 🚫 3. Handle Root path "/" and Login page redirects
      if (path === "/" || path === "/login") {
        const dashboard = role === "admin" ? "/admin/dashboard" : "/doctor/dashboard"
        return NextResponse.redirect(new URL(dashboard, req.url))
      }

      // 🔒 4. Role-based protection
      if (role === "admin" && path.startsWith("/doctor")) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url))
      }
      if (role === "doctor" && path.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/doctor/dashboard", req.url))
      }
    } catch (error) {
      console.error("Invalid Token:", error)
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  // ✅ Allow the request to proceed if everything is valid
  return NextResponse.next()
}

// 📍 Apply the middleware to specific routes
export const config = {
  matcher: [
    "/",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/admin/:path*",
    "/doctor/:path*",
  ],
}
