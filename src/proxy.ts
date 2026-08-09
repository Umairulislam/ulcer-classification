import { NextResponse, type NextRequest } from "next/server"
import { decodeJwt } from "@/utils/decodeJwt"
import { DASHBOARD_BY_ROLE } from "./constants/roles"

interface JwtPayload {
  exp: number
  role: "admin" | "doctor"
}

const publicPaths = ["/login", "/forgot-password", "/reset-password"]

export function proxy(req: NextRequest): NextResponse {
  const path = req.nextUrl.pathname
  const accessToken = req.cookies.get("accessToken")?.value

  // 1. No token, protected route → login
  if (!accessToken && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (accessToken) {
    const payload = decodeJwt(accessToken)

    // decodeJwt returns null (not a thrown error) on a malformed token —
    // check for that explicitly rather than relying on try/catch.
    if (!payload) {
      const res = NextResponse.redirect(new URL("/login", req.url))
      res.cookies.delete("accessToken")
      return res
    }

    const { exp, role } = payload as unknown as JwtPayload
    const isExpired = exp * 1000 < Date.now()

    // 2. Expired token → clear it, go to login
    if (isExpired) {
      const res = NextResponse.redirect(new URL("/login", req.url))
      res.cookies.delete("accessToken")
      return res
    }

    // 3. Logged in, on "/" or "/login" → send to their own dashboard
    if (path === "/" || path === "/login") {
      return NextResponse.redirect(new URL(DASHBOARD_BY_ROLE[role], req.url))
    }

    // 4. Logged in, wrong role's section → send to their own dashboard
    if (role === "admin" && path.startsWith("/doctor")) {
      return NextResponse.redirect(new URL(DASHBOARD_BY_ROLE.admin, req.url))
    }
    if (role === "doctor" && path.startsWith("/admin")) {
      return NextResponse.redirect(new URL(DASHBOARD_BY_ROLE.doctor, req.url))
    }
  }

  return NextResponse.next()
}

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
