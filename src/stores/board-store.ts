"use client"

import { create } from "zustand"
import { applyNodeChanges, applyEdgeChanges, type EdgeChange, type NodeChange } from "reactflow"
import type { BoardActivityEvent, BoardFlowEdge, BoardFlowNode, BoardMessage } from "@/types/boards"
import type { RealtimeBoardEvent } from "@/types/realtime"
import type { WorkspaceRole } from "@/types/workspace"

type NodeLock = {
  nodeId: string
  userId: string
  name: string
  expiresAt: number
}

type HydratePayload = {
  boardId: string
  role: WorkspaceRole
  nodes: BoardFlowNode[]
  edges: BoardFlowEdge[]
  messages: BoardMessage[]
  events: BoardActivityEvent[]
}

type BoardStore = {
  boardId: string | null
  role: WorkspaceRole | null
  nodes: BoardFlowNode[]
  edges: BoardFlowEdge[]
  messages: BoardMessage[]
  events: BoardActivityEvent[]
  locks: Record<string, NodeLock>
  hydrated: boolean
  hydrate: (payload: HydratePayload) => void
  setNodes: (nodes: BoardFlowNode[]) => void
  setEdges: (edges: BoardFlowEdge[]) => void
  applyNodeChanges: (changes: NodeChange[]) => void
  applyEdgeChanges: (changes: EdgeChange[]) => void
  applyRealtimeEvent: (event: RealtimeBoardEvent) => void
}

function upsertEvent(existing: BoardActivityEvent[], event?: BoardActivityEvent) {
  if (!event) {
    return existing
  }

  const next = [event, ...existing.filter((item) => item.id !== event.id)]
  return next.slice(0, 50)
}

export const useBoardStore = create<BoardStore>((set) => ({
  boardId: null,
  role: null,
  nodes: [],
  edges: [],
  messages: [],
  events: [],
  locks: {},
  hydrated: false,
  hydrate: ({ boardId, role, nodes, edges, messages, events }) =>
    set({
      boardId,
      role,
      nodes,
      edges,
      messages,
      events,
      hydrated: true,
    }),
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  applyNodeChanges: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),
  applyEdgeChanges: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),
  applyRealtimeEvent: (event) =>
    set((state) => {
      switch (event.type) {
        case "board:node_created":
        case "board:node_updated": {
          const nextNodes = [
            event.payload.node,
            ...state.nodes.filter((node) => node.id !== event.payload.node.id),
          ]

          return {
            nodes: nextNodes,
            events: upsertEvent(state.events, event.payload.event),
          }
        }
        case "board:node_moved":
          return {
            nodes: state.nodes.map((node) =>
              node.id === event.payload.nodeId
                ? { ...node, position: event.payload.position }
                : node
            ),
            events: upsertEvent(state.events, event.payload.event),
          }
        case "board:node_deleted":
          return {
            nodes: state.nodes.filter((node) => node.id !== event.payload.nodeId),
            edges: state.edges.filter(
              (edge) =>
                edge.source !== event.payload.nodeId &&
                edge.target !== event.payload.nodeId
            ),
            events: upsertEvent(state.events, event.payload.event),
          }
        case "board:edge_created":
        case "board:edge_updated":
          return {
            edges: [
              event.payload.edge,
              ...state.edges.filter((edge) => edge.id !== event.payload.edge.id),
            ],
            events: upsertEvent(state.events, event.payload.event),
          }
        case "board:edge_deleted":
          return {
            edges: state.edges.filter((edge) => edge.id !== event.payload.edgeId),
            events: upsertEvent(state.events, event.payload.event),
          }
        case "board:chat_message":
          return {
            messages: [...state.messages, event.payload.message],
          }
        case "board:node_lock":
          return {
            locks: {
              ...state.locks,
              [event.payload.nodeId]: {
                nodeId: event.payload.nodeId,
                userId: event.payload.userId,
                name: event.payload.name,
                expiresAt: event.payload.expiresAt,
              },
            },
          }
        case "board:node_unlock": {
          const locks = { ...state.locks }
          delete locks[event.payload.nodeId]
          return { locks }
        }
        default:
          return state
      }
    }),
}))
