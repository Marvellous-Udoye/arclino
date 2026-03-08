"use server"

import { revalidatePath } from "next/cache"
import {
  createEdgeSchema,
  createNodeSchema,
  deleteEdgeSchema,
  deleteNodeSchema,
  moveNodeSchema,
  nodeLockSchema,
  updateEdgeSchema,
  updateNodeSchema,
} from "@/features/canvas/schemas/canvas-schema"
import { createBoardEvent } from "@/features/boards/utils/board-events"
import { triggerBoardEvent } from "@/features/realtime/utils/trigger-board-event"
import { createClient } from "@/lib/supabase/server"
import { requireUser } from "@/lib/auth/session"
import { mapEdgeRowToFlowEdge, mapNodeRowToFlowNode } from "@/features/canvas/utils/serializers"

async function getCurrentProfileName(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", userId)
    .maybeSingle()

  return data?.full_name || data?.email || "Teammate"
}

export async function createNodeAction(input: {
  boardId: string
  workspaceId: string
  type: "step" | "decision" | "input-output" | "system" | "database" | "note"
  label: string
  position: { x: number; y: number }
}) {
  const user = await requireUser()
  const parsed = createNodeSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid node." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("board_nodes")
    .insert({
      board_id: parsed.data.boardId,
      workspace_id: parsed.data.workspaceId,
      type: parsed.data.type,
      label: parsed.data.label,
      data: {
        label: parsed.data.label,
        type: parsed.data.type,
      },
      position_x: parsed.data.position.x,
      position_y: parsed.data.position.y,
      created_by: user.id,
    })
    .select("*")
    .single()

  if (error) {
    return { error: error.message }
  }

  const event = await createBoardEvent({
    boardId: parsed.data.boardId,
    workspaceId: parsed.data.workspaceId,
    actorUserId: user.id,
    type: "node_created",
    payload: { nodeId: data.id, label: data.label, nodeType: data.type },
  })

  const node = mapNodeRowToFlowNode(data)
  await triggerBoardEvent(parsed.data.boardId, {
    type: "board:node_created",
    payload: { node, event },
  })

  revalidatePath(`/dashboard/boards/${parsed.data.boardId}`)
  return { data: node }
}

export async function updateNodeAction(input: {
  nodeId: string
  boardId: string
  workspaceId: string
  type: "step" | "decision" | "input-output" | "system" | "database" | "note"
  label: string
}) {
  const user = await requireUser()
  const parsed = updateNodeSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid node update." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("board_nodes")
    .update({
      type: parsed.data.type,
      label: parsed.data.label,
      data: {
        label: parsed.data.label,
        type: parsed.data.type,
      },
    })
    .eq("id", parsed.data.nodeId)
    .select("*")
    .single()

  if (error) {
    return { error: error.message }
  }

  const event = await createBoardEvent({
    boardId: parsed.data.boardId,
    workspaceId: parsed.data.workspaceId,
    actorUserId: user.id,
    type: "node_updated",
    payload: { nodeId: data.id, label: data.label, nodeType: data.type },
  })

  const node = mapNodeRowToFlowNode(data)
  await triggerBoardEvent(parsed.data.boardId, {
    type: "board:node_updated",
    payload: { node, event },
  })

  return { data: node }
}

export async function moveNodeAction(input: {
  nodeId: string
  boardId: string
  workspaceId: string
  position: { x: number; y: number }
}) {
  const user = await requireUser()
  const parsed = moveNodeSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid node position." }
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from("board_nodes")
    .update({
      position_x: parsed.data.position.x,
      position_y: parsed.data.position.y,
    })
    .eq("id", parsed.data.nodeId)

  if (error) {
    return { error: error.message }
  }

  const event = await createBoardEvent({
    boardId: parsed.data.boardId,
    workspaceId: parsed.data.workspaceId,
    actorUserId: user.id,
    type: "node_moved",
    payload: {
      nodeId: parsed.data.nodeId,
      position: parsed.data.position,
    },
  })

  await triggerBoardEvent(parsed.data.boardId, {
    type: "board:node_moved",
    payload: {
      nodeId: parsed.data.nodeId,
      position: parsed.data.position,
      event,
    },
  })

  return { data: parsed.data }
}

export async function deleteNodeAction(input: {
  nodeId: string
  boardId: string
  workspaceId: string
}) {
  const user = await requireUser()
  const parsed = deleteNodeSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid node delete." }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("board_nodes").delete().eq("id", parsed.data.nodeId)

  if (error) {
    return { error: error.message }
  }

  const event = await createBoardEvent({
    boardId: parsed.data.boardId,
    workspaceId: parsed.data.workspaceId,
    actorUserId: user.id,
    type: "node_deleted",
    payload: { nodeId: parsed.data.nodeId },
  })

  await triggerBoardEvent(parsed.data.boardId, {
    type: "board:node_deleted",
    payload: { nodeId: parsed.data.nodeId, event },
  })

  return { data: parsed.data.nodeId }
}

export async function createEdgeAction(input: {
  boardId: string
  workspaceId: string
  sourceNodeId: string
  targetNodeId: string
  label?: string
}) {
  const user = await requireUser()
  const parsed = createEdgeSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid edge." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("board_edges")
    .insert({
      board_id: parsed.data.boardId,
      workspace_id: parsed.data.workspaceId,
      source_node_id: parsed.data.sourceNodeId,
      target_node_id: parsed.data.targetNodeId,
      label: parsed.data.label || null,
      data: {
        label: parsed.data.label || null,
      },
      created_by: user.id,
    })
    .select("*")
    .single()

  if (error) {
    return { error: error.message }
  }

  const event = await createBoardEvent({
    boardId: parsed.data.boardId,
    workspaceId: parsed.data.workspaceId,
    actorUserId: user.id,
    type: "edge_created",
    payload: { edgeId: data.id, source: data.source_node_id, target: data.target_node_id },
  })

  const edge = mapEdgeRowToFlowEdge(data)
  await triggerBoardEvent(parsed.data.boardId, {
    type: "board:edge_created",
    payload: { edge, event },
  })

  return { data: edge }
}

export async function updateEdgeAction(input: {
  edgeId: string
  boardId: string
  workspaceId: string
  label?: string
}) {
  const user = await requireUser()
  const parsed = updateEdgeSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid edge update." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("board_edges")
    .update({
      label: parsed.data.label || null,
      data: {
        label: parsed.data.label || null,
      },
    })
    .eq("id", parsed.data.edgeId)
    .select("*")
    .single()

  if (error) {
    return { error: error.message }
  }

  const event = await createBoardEvent({
    boardId: parsed.data.boardId,
    workspaceId: parsed.data.workspaceId,
    actorUserId: user.id,
    type: "edge_updated",
    payload: { edgeId: data.id, label: data.label },
  })

  const edge = mapEdgeRowToFlowEdge(data)
  await triggerBoardEvent(parsed.data.boardId, {
    type: "board:edge_updated",
    payload: { edge, event },
  })

  return { data: edge }
}

export async function deleteEdgeAction(input: {
  edgeId: string
  boardId: string
  workspaceId: string
}) {
  const user = await requireUser()
  const parsed = deleteEdgeSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid edge delete." }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("board_edges").delete().eq("id", parsed.data.edgeId)

  if (error) {
    return { error: error.message }
  }

  const event = await createBoardEvent({
    boardId: parsed.data.boardId,
    workspaceId: parsed.data.workspaceId,
    actorUserId: user.id,
    type: "edge_deleted",
    payload: { edgeId: parsed.data.edgeId },
  })

  await triggerBoardEvent(parsed.data.boardId, {
    type: "board:edge_deleted",
    payload: { edgeId: parsed.data.edgeId, event },
  })

  return { data: parsed.data.edgeId }
}

export async function lockNodeAction(input: {
  boardId: string
  workspaceId: string
  nodeId: string
}) {
  const user = await requireUser()
  const parsed = nodeLockSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid lock payload." }
  }

  const name = await getCurrentProfileName(user.id)

  await triggerBoardEvent(parsed.data.boardId, {
    type: "board:node_lock",
    payload: {
      nodeId: parsed.data.nodeId,
      userId: user.id,
      name,
      expiresAt: Date.now() + 10_000,
    },
  })

  return { data: true }
}

export async function unlockNodeAction(input: {
  boardId: string
  workspaceId: string
  nodeId: string
}) {
  const parsed = nodeLockSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid unlock payload." }
  }

  await requireUser()
  await triggerBoardEvent(parsed.data.boardId, {
    type: "board:node_unlock",
    payload: {
      nodeId: parsed.data.nodeId,
    },
  })

  return { data: true }
}
