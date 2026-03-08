import { createClient } from "@/lib/supabase/server"
import type { WorkspaceSummary } from "@/types/workspace"

export async function getCurrentWorkspace(userId: string): Promise<WorkspaceSummary | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("workspace_members")
    .select("workspace_id, role, workspaces(id, name, created_at)")
    .eq("user_id", userId)
    .limit(1)
    .maybeSingle()

  if (error) {
    throw error
  }

  if (!data?.workspaces) {
    return null
  }

  const workspace = Array.isArray(data.workspaces) ? data.workspaces[0] : data.workspaces

  return {
    id: workspace.id,
    name: workspace.name,
    createdAt: workspace.created_at,
    role: data.role,
  }
}
