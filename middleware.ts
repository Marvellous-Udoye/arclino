import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const TOKEN_COOKIE = "token"

const PROTECTED_ROUTES = ["/dashboard", "/onboarding", "/invite/board"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    const token = req.cookies.get(TOKEN_COOKIE)?.value
    if (!token) {
      const loginUrl = new URL("/auth/login", req.url)
      loginUrl.searchParams.set("next", pathname)
      return NextResponse.redirect(loginUrl)
    }

    const role = (req.cookies.get("user_role")?.value || "")
      .toLowerCase()
      .trim()
      .replace(/_/g, " ")

    if (pathname.startsWith("/dashboard/settings/members") && role !== "owner") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/invite/board/:path*"],
}
