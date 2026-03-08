import type { Edge, Node } from "reactflow"
import type { WorkspaceRole } from "@/types/workspace"

export const boardNodeTypes = [
  "step",
  "decision",
  "input-output",
  "system",
  "database",
  "note",
] as const

export type BoardNodeKind = (typeof boardNodeTypes)[number]

export type BoardNodeData = {
  label: string
  type: BoardNodeKind
}

export type BoardFlowNode = Node<BoardNodeData>

export type BoardFlowEdge = Edge<{ label?: string }>

export type BoardSummary = {
  id: string
  workspaceId: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
}

export type BoardMessage = {
  id: string
  boardId: string
  workspaceId: string
  userId: string
  body: string
  createdAt: string
  authorName: string | null
}

export type BoardActivityEvent = {
  id: string
  boardId: string
  workspaceId: string
  actorUserId: string
  type: string
  payload: Record<string, unknown>
  createdAt: string
  actorName: string | null
}

export type BoardRoomData = {
  board: BoardSummary
  workspaceRole: WorkspaceRole
  nodes: BoardFlowNode[]
  edges: BoardFlowEdge[]
  messages: BoardMessage[]
  events: BoardActivityEvent[]
}
