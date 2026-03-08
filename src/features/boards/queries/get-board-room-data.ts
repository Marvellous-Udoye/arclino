import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { mapEdgeRowToFlowEdge, mapNodeRowToFlowNode } from "@/features/canvas/utils/serializers"
import type { BoardActivityEvent, BoardMessage, BoardRoomData } from "@/types/boards"
import type { WorkspaceRole } from "@/types/workspace"

export async function getBoardRoomData(boardId: string, userId: string): Promise<BoardRoomData> {
  const supabase = await createClient()

  const { data: board, error: boardError } = await supabase
    .from("boards")
    .select("id, workspace_id, name, description, created_at, updated_at")
    .eq("id", boardId)
    .is("deleted_at", null)
    .maybeSingle()

  if (boardError) {
    throw boardError
  }

  if (!board) {
    notFound()
  }

  const { data: membership, error: membershipError } = await supabase
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", board.workspace_id)
    .eq("user_id", userId)
    .maybeSingle()

  if (membershipError) {
    throw membershipError
  }

  if (!membership) {
    notFound()
  }

  const [
    { data: nodes, error: nodesError },
    { data: edges, error: edgesError },
    { data: messages, error: messagesError },
    { data: events, error: eventsError },
  ] = await Promise.all([
    supabase.from("board_nodes").select("*").eq("board_id", boardId).order("created_at", { ascending: true }),
    supabase.from("board_edges").select("*").eq("board_id", boardId).order("created_at", { ascending: true }),
    supabase.from("board_messages").select("*").eq("board_id", boardId).order("created_at", { ascending: true }),
    supabase.from("board_events").select("*").eq("board_id", boardId).order("created_at", { ascending: false }).limit(50),
  ])

  if (nodesError) throw nodesError
  if (edgesError) throw edgesError
  if (messagesError) throw messagesError
  if (eventsError) throw eventsError

  const userIds = Array.from(
    new Set([
      ...(messages ?? []).map((message) => message.user_id),
      ...(events ?? []).map((event) => event.actor_user_id),
    ])
  )

  const profiles =
    userIds.length === 0
      ? []
      : (
          await supabase
            .from("profiles")
            .select("id, full_name, email")
            .in("id", userIds)
        ).data ?? []

  const profileMap = new Map(
    profiles.map((profile) => [
      profile.id,
      profile.full_name || profile.email,
    ])
  )

  return {
    board: {
      id: board.id,
      workspaceId: board.workspace_id,
      name: board.name,
      description: board.description,
      createdAt: board.created_at,
      updatedAt: board.updated_at,
    },
    workspaceRole: membership.role as WorkspaceRole,
    nodes: (nodes ?? []).map(mapNodeRowToFlowNode),
    edges: (edges ?? []).map(mapEdgeRowToFlowEdge),
    messages: (messages ?? []).map<BoardMessage>((message) => ({
      id: message.id,
      boardId: message.board_id,
      workspaceId: message.workspace_id,
      userId: message.user_id,
      body: message.body,
      createdAt: message.created_at,
      authorName: profileMap.get(message.user_id) ?? null,
    })),
    events: (events ?? []).map<BoardActivityEvent>((event) => ({
      id: event.id,
      boardId: event.board_id,
      workspaceId: event.workspace_id,
      actorUserId: event.actor_user_id,
      type: event.type,
      payload:
        event.payload && typeof event.payload === "object" && !Array.isArray(event.payload)
          ? (event.payload as Record<string, unknown>)
          : {},
      createdAt: event.created_at,
      actorName: profileMap.get(event.actor_user_id) ?? null,
    })),
  }
}
