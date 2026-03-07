import { NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode"

type DecodedToken = {
  exp?: number
}

const TOKEN_COOKIE = "token"

const getMaxAge = (token: string) => {
  try {
    const decoded = jwtDecode<DecodedToken>(token)
    if (decoded?.exp && decoded.exp > Date.now() / 1000) {
      return Math.max(0, Math.floor(decoded.exp - Date.now() / 1000))
    }
  } catch {
    // ignore decode failures
  }
  return 60 * 60 * 24
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const token = body?.token
    const role = body?.role

    if (!token || typeof token !== "string") {
      return NextResponse.json({ message: "Missing token." }, { status: 400 })
    }

    const response = NextResponse.json({ ok: true })
    const cookieOptions = {
      maxAge: getMaxAge(token),
      path: "/",
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    }

    response.cookies.set(TOKEN_COOKIE, token, cookieOptions)

    if (role) {
      const normalizedRole = String(role)
        .toLowerCase()
        .trim()
        .replace(/_/g, " ")
      response.cookies.set("user_role", normalizedRole, cookieOptions)
    }

    return response
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Invalid request." },
      { status: 400 }
    )
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(TOKEN_COOKIE, "", {
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })
  return response
}


