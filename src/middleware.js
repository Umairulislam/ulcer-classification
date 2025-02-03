import { NextResponse } from 'next/server'
import { decodeJwt } from '@/utils/utils'

export function middleware(req) {
    const path = req.nextUrl.pathname

    // Public routes that don't require authentication
    const publicPaths = [
        "/",
        '/login',
        '/forgot-password',
        '/reset-password',

    ]

    // Get the access token from cookies
    const accessToken = req.cookies.get("accessToken")?.value

    // 🚩 1. Redirect unauthenticated users trying to access protected routes
    if (!accessToken && !publicPaths.includes(path)) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    if (accessToken) {
        try {
            const decodedJwt = decodeJwt(accessToken)

            // ⏱️ 2. Check if the token has expired
            const isExpired = decodedJwt.exp * 1000 < Date.now()
            if (isExpired) {
                console.warn("Token has expired");
                return NextResponse.redirect(new URL('/login', req.url));
            }

            // 🔒 3. Role-based access control
            if (decodedJwt.role === "admin" && path.startsWith("/doctor")) {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url))
            }

            if (decodedJwt.role === "doctor" && path.startsWith("/admin")) {
                return NextResponse.redirect(new URL("/doctor/dashboard", req.url))
            }

            // 🚫 4. Prevent logged-in users from accessing the login page again
            if (accessToken && path === "/login") {
                return NextResponse.redirect(new URL(
                    decodedJwt.role === "admin" ? "/admin/dashboard" : "/doctor/dashboard",
                    req.url
                ));
            }

        } catch (error) {
            console.error("Invalid Token:", error);
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    // ✅ Allow the request to proceed if everything is valid
    return NextResponse.next();

}

// 📍 Apply the middleware to specific routes
export const config = {
    matcher: [
        "/login",
        "/forgot-password",
        "/reset-password",
        "/admin/:path*",
        "/doctor/:path*",
    ]
}