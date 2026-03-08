import { redirect } from "next/navigation"
import { authCallbackSchema } from "@/features/auth/schemas/auth-schema"
import { getSafeNextPath } from "@/features/auth/utils/next-path"
import { createClient } from "@/lib/supabase/server"

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const parsed = authCallbackSchema.safeParse({
    code: typeof params.code === "string" ? params.code : undefined,
    next: typeof params.next === "string" ? params.next : undefined,
  })

  const next = getSafeNextPath(parsed.success ? parsed.data.next : undefined, "/dashboard")
  const supabase = await createClient()

  if (parsed.success && parsed.data.code) {
    const { error } = await supabase.auth.exchangeCodeForSession(parsed.data.code)
    if (error) {
      redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }
  }

  await supabase.rpc("ensure_profile", {})
  redirect(next)
}
