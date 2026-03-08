import { createClient } from "@/lib/supabase/server"
import type { WorkspaceMember, WorkspaceSummary } from "@/types/workspace"

export async function getWorkspaceMembersData(userId: string): Promise<{
  workspace: WorkspaceSummary | null
  members: WorkspaceMember[]
  boards: Array<{ id: string; name: string }>
  invites: Array<{
    id: string
    boardId: string
    role: "editor" | "viewer"
    token: string
    usesCount: number
    maxUses: number | null
    revokedAt: string | null
    expiresAt: string | null
  }>
}> {
  const supabase = await createClient()
  const { data: membership, error: membershipError } = await supabase
    .from("workspace_members")
    .select("workspace_id, role, workspaces(id, name, created_at)")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle()

  if (membershipError) {
    throw membershipError
  }

  if (!membership?.workspaces) {
    return { workspace: null, members: [], boards: [], invites: [] }
  }

  const workspace = Array.isArray(membership.workspaces)
    ? membership.workspaces[0]
    : membership.workspaces

  const { data: members, error: membersError } = await supabase
    .from("workspace_members")
    .select("id, workspace_id, user_id, role, created_at")
    .eq("workspace_id", workspace.id)
    .order("created_at", { ascending: true })

  if (membersError) {
    throw membersError
  }

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, email, avatar_url")
    .in(
      "id",
      (members ?? []).map((member) => member.user_id)
    )

  const profileMap = new Map((profiles ?? []).map((profile) => [profile.id, profile]))

  const { data: invites, error: inviteError } = await supabase
    .from("board_invite_links")
    .select("id, board_id, role, token, uses_count, max_uses, revoked_at, expires_at")
    .eq("workspace_id", workspace.id)
    .order("created_at", { ascending: false })

  if (inviteError && membership.role === "owner") {
    throw inviteError
  }

  const { data: boards, error: boardsError } = await supabase
    .from("boards")
    .select("id, name")
    .eq("workspace_id", workspace.id)
    .is("deleted_at", null)
    .order("updated_at", { ascending: false })

  if (boardsError) {
    throw boardsError
  }

  return {
    workspace: {
      id: workspace.id,
      name: workspace.name,
      createdAt: workspace.created_at,
      role: membership.role,
    },
    members: (members ?? []).map((member) => {
      const profile = profileMap.get(member.user_id)
      return {
        id: member.id,
        userId: member.user_id,
        workspaceId: member.workspace_id,
        role: member.role,
        createdAt: member.created_at,
        profile: profile
          ? {
              email: profile.email,
              fullName: profile.full_name,
              avatarUrl: profile.avatar_url,
            }
          : null,
      }
    }),
    boards: (boards ?? []).map((board) => ({
      id: board.id,
      name: board.name,
    })),
    invites: (invites ?? []).map((invite) => ({
      id: invite.id,
      boardId: invite.board_id,
      role: invite.role,
      token: invite.token,
      usesCount: invite.uses_count,
      maxUses: invite.max_uses,
      revokedAt: invite.revoked_at,
      expiresAt: invite.expires_at,
    })),
  }
}
