import { createClient } from "@/lib/supabase/server"
import type { BoardActivityEvent } from "@/types/boards"

export async function createBoardEvent(input: {
  boardId: string
  workspaceId: string
  actorUserId: string
  type: string
  payload?: Record<string, unknown>
}): Promise<BoardActivityEvent> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("board_events")
    .insert({
      board_id: input.boardId,
      workspace_id: input.workspaceId,
      actor_user_id: input.actorUserId,
      type: input.type,
      payload: input.payload ?? {},
    })
    .select("*")
    .single()

  if (error) {
    throw error
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", input.actorUserId)
    .maybeSingle()

  return {
    id: data.id,
    boardId: data.board_id,
    workspaceId: data.workspace_id,
    actorUserId: data.actor_user_id,
    type: data.type,
    payload:
      data.payload && typeof data.payload === "object" && !Array.isArray(data.payload)
        ? (data.payload as Record<string, unknown>)
        : {},
    createdAt: data.created_at,
    actorName: profile?.full_name || profile?.email || null,
  }
}
