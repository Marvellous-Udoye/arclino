"use server"

import { revalidatePath } from "next/cache"
import { createWorkspaceSchema } from "@/features/workspace/schemas/workspace-schema"
import { createClient } from "@/lib/supabase/server"
import { requireUser } from "@/lib/auth/session"

export async function createWorkspaceAction(input: { name: string }) {
  const user = await requireUser("/onboarding/workspace")
  const parsed = createWorkspaceSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid workspace name." }
  }

  const supabase = await createClient()
  await supabase.rpc("ensure_profile", {
    full_name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
  })

  const { data, error } = await supabase.rpc("create_workspace_with_owner", {
    _name: parsed.data.name,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard")

  return { data }
}
