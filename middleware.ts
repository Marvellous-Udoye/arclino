import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

const protectedPrefixes = ["/dashboard", "/onboarding", "/invite/board"]

export async function middleware(request: NextRequest) {
  const { response, supabase } = await updateSession(request)
  const pathname = request.nextUrl.pathname
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix))

  if (!isProtected) {
    return response
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/login"
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/invite/board/:path*"],
}
