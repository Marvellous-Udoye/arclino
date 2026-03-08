import type {
  BoardActivityEvent,
  BoardFlowEdge,
  BoardFlowNode,
  BoardMessage,
} from "@/types/boards"

export type PresenceMember = {
  id: string
  name: string
  email: string
}

export type RealtimeBoardEvent =
  | { type: "board:node_created"; payload: { node: BoardFlowNode; event?: BoardActivityEvent } }
  | { type: "board:node_updated"; payload: { node: BoardFlowNode; event?: BoardActivityEvent } }
  | { type: "board:node_moved"; payload: { nodeId: string; position: { x: number; y: number }; event?: BoardActivityEvent } }
  | { type: "board:node_deleted"; payload: { nodeId: string; event?: BoardActivityEvent } }
  | { type: "board:edge_created"; payload: { edge: BoardFlowEdge; event?: BoardActivityEvent } }
  | { type: "board:edge_updated"; payload: { edge: BoardFlowEdge; event?: BoardActivityEvent } }
  | { type: "board:edge_deleted"; payload: { edgeId: string; event?: BoardActivityEvent } }
  | { type: "board:chat_message"; payload: { message: BoardMessage } }
  | { type: "board:node_lock"; payload: { nodeId: string; userId: string; name: string; expiresAt: number } }
  | { type: "board:node_unlock"; payload: { nodeId: string } }

export type RealtimeBoardEventType = RealtimeBoardEvent["type"]
