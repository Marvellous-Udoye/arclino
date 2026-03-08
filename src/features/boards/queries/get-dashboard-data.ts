import { createClient } from "@/lib/supabase/server"
import type { BoardSummary } from "@/types/boards"
import type { WorkspaceSummary } from "@/types/workspace"

export async function getDashboardData(userId: string): Promise<{
  workspace: WorkspaceSummary | null
  boards: BoardSummary[]
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
    return { workspace: null, boards: [] }
  }

  const workspace = Array.isArray(membership.workspaces)
    ? membership.workspaces[0]
    : membership.workspaces

  const { data: boards, error: boardsError } = await supabase
    .from("boards")
    .select("id, workspace_id, name, description, created_at, updated_at")
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
    boards: (boards ?? []).map((board) => ({
      id: board.id,
      workspaceId: board.workspace_id,
      name: board.name,
      description: board.description,
      createdAt: board.created_at,
      updatedAt: board.updated_at,
    })),
  }
}
