"use server"

import { randomBytes } from "crypto"
import { revalidatePath } from "next/cache"
import { createInviteSchema, revokeInviteSchema } from "@/features/invites/schemas/invite-schema"
import { createClient } from "@/lib/supabase/server"
import { requireUser } from "@/lib/auth/session"

export async function createInviteAction(input: {
  boardId: string
  workspaceId: string
  role: "editor" | "viewer"
  maxUses?: number
  expiresAt?: string
}) {
  const user = await requireUser()
  const parsed = createInviteSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid invite settings." }
  }

  const supabase = await createClient()
  const token = randomBytes(24).toString("hex")
  const { data, error } = await supabase
    .from("board_invite_links")
    .insert({
      board_id: parsed.data.boardId,
      workspace_id: parsed.data.workspaceId,
      token,
      role: parsed.data.role,
      max_uses: parsed.data.maxUses ?? null,
      expires_at: parsed.data.expiresAt || null,
      created_by: user.id,
    })
    .select("*")
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/dashboard/settings/members`)
  return { data }
}

export async function revokeInviteAction(input: {
  inviteId: string
  workspaceId: string
}) {
  const parsed = revokeInviteSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid invite revoke request." }
  }

  await requireUser()
  const supabase = await createClient()
  const { error } = await supabase
    .from("board_invite_links")
    .update({ revoked_at: new Date().toISOString() })
    .eq("id", parsed.data.inviteId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/dashboard/settings/members`)
  return { data: true }
}
