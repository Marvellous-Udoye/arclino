import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function getSessionUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export async function requireUser(next?: string) {
  const user = await getSessionUser()

  if (!user) {
    const params = new URLSearchParams()
    if (next) {
      params.set("next", next)
    }

    redirect(params.size ? `/login?${params.toString()}` : "/login")
  }

  return user
}

export async function getCurrentMembership() {
  const user = await getSessionUser()

  if (!user) {
    return null
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("workspace_members")
    .select("workspace_id, role")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

export async function redirectIfNoWorkspace() {
  const membership = await getCurrentMembership()

  if (!membership) {
    redirect("/onboarding/workspace")
  }

  return membership
}
