import { NextResponse } from "next/server"
import { authCallbackSchema } from "@/features/auth/schemas/auth-schema"
import { getSafeNextPath } from "@/features/auth/utils/next-path"
import { getPostAuthPath } from "@/features/auth/utils/get-post-auth-path"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const parsed = authCallbackSchema.safeParse({
    code: url.searchParams.get("code") ?? undefined,
    next: url.searchParams.get("next") ?? undefined,
  })

  const requestedNext = parsed.success ? parsed.data.next : undefined
  const next = getSafeNextPath(parsed.success ? parsed.data.next : undefined, "/dashboard")
  const supabase = await createClient()

  if (parsed.success && parsed.data.code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(parsed.data.code)

    if (error) {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(error.message)}`, url)
      )
    }

    await supabase.rpc("ensure_profile")

    const nextPath = data.user ? await getPostAuthPath(data.user.id) : next
    const shouldHonorRequestedNext =
      Boolean(requestedNext && requestedNext !== "/dashboard")

    return NextResponse.redirect(
      new URL(shouldHonorRequestedNext ? requestedNext! : nextPath, url)
    )
  }

  return NextResponse.redirect(new URL(next, url))
}
