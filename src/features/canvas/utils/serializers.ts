import type { Database } from "@/types/database"
import type { BoardFlowEdge, BoardFlowNode } from "@/types/boards"

type NodeRow = Database["public"]["Tables"]["board_nodes"]["Row"]
type EdgeRow = Database["public"]["Tables"]["board_edges"]["Row"]

export function mapNodeRowToFlowNode(row: NodeRow): BoardFlowNode {
  return {
    id: row.id,
    type: "default",
    position: {
      x: row.position_x,
      y: row.position_y,
    },
    data: {
      label: row.label,
      type: row.type,
    },
  }
}

export function mapEdgeRowToFlowEdge(row: EdgeRow): BoardFlowEdge {
  return {
    id: row.id,
    source: row.source_node_id,
    target: row.target_node_id,
    label: row.label ?? undefined,
    data: {
      label: row.label ?? undefined,
    },
  }
}
