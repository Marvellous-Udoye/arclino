"use client"

import { useEffect, useMemo, useRef, useState, useTransition } from "react"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  type Connection,
  type Node,
} from "reactflow"
import "reactflow/dist/style.css"
import {
  createEdgeAction,
  createNodeAction,
  deleteEdgeAction,
  deleteNodeAction,
  lockNodeAction,
  moveNodeAction,
  unlockNodeAction,
  updateEdgeAction,
  updateNodeAction,
} from "@/features/canvas/actions/board-canvas-actions"
import { useBoardStore } from "@/stores/board-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { boardNodeTypes, type BoardFlowEdge, type BoardFlowNode, type BoardNodeKind } from "@/types/boards"
import type { WorkspaceRole } from "@/types/workspace"

function BoardCanvasInner({
  boardId,
  workspaceId,
  role,
}: {
  boardId: string
  workspaceId: string
  role: WorkspaceRole
}) {
  const nodes = useBoardStore((state) => state.nodes)
  const edges = useBoardStore((state) => state.edges)
  const locks = useBoardStore((state) => state.locks)
  const applyNodeChanges = useBoardStore((state) => state.applyNodeChanges)
  const applyEdgeChanges = useBoardStore((state) => state.applyEdgeChanges)
  const setNodes = useBoardStore((state) => state.setNodes)
  const setEdges = useBoardStore((state) => state.setEdges)
  const canEdit = role === "owner" || role === "editor"
  const [newNodeLabel, setNewNodeLabel] = useState("New step")
  const [newNodeType, setNewNodeType] = useState<BoardNodeKind>("step")
  const [isPending, startTransition] = useTransition()
  const moveTimeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  useEffect(() => {
    const interval = window.setInterval(() => {
      const now = Date.now()
      for (const [nodeId, lock] of Object.entries(locks)) {
        if (lock.expiresAt <= now) {
          useBoardStore.setState((state) => {
            const nextLocks = { ...state.locks }
            delete nextLocks[nodeId]
            return { locks: nextLocks }
          })
        }
      }
    }, 1000)

    return () => window.clearInterval(interval)
  }, [locks])

  const flowNodes = useMemo(
    () =>
      nodes.map((node) => {
        const lock = locks[node.id]
        const lockedByOther = Boolean(lock)
        return {
          ...node,
          draggable: canEdit && !lockedByOther,
          selectable: true,
          style: {
            border: lockedByOther ? "1px solid rgba(248,113,113,0.8)" : "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            background: "rgba(24,24,27,0.95)",
            color: "white",
            minWidth: 180,
            boxShadow:
              node.data.type === "decision"
                ? "0 0 0 1px rgba(34,211,238,0.35)"
                : "none",
          },
        } satisfies Node
      }),
    [canEdit, locks, nodes]
  )

  const flowEdges = useMemo(
    () =>
      edges.map((edge) => ({
        ...edge,
        animated: false,
        style: { stroke: "#67e8f9" },
        labelStyle: { fill: "#fff" },
      })),
    [edges]
  )

  const throttleMove = (node: BoardFlowNode) => {
    const existing = moveTimeouts.current[node.id]
    if (existing) {
      clearTimeout(existing)
    }

    moveTimeouts.current[node.id] = setTimeout(() => {
      startTransition(async () => {
        await moveNodeAction({
          nodeId: node.id,
          boardId,
          workspaceId,
          position: node.position,
        })
      })
    }, 80)
  }

  const handleCreateNode = () => {
    if (!canEdit) {
      return
    }

    startTransition(async () => {
      await createNodeAction({
        boardId,
        workspaceId,
        type: newNodeType,
        label: newNodeLabel || "Untitled node",
        position: {
          x: 120 + nodes.length * 24,
          y: 120 + nodes.length * 24,
        },
      })
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-3">
        <select
          className="rounded-md border border-white/10 bg-zinc-950 px-3 py-2 text-sm"
          value={newNodeType}
          onChange={(event) => setNewNodeType(event.target.value as BoardNodeKind)}
          disabled={!canEdit}
        >
          {boardNodeTypes.map((nodeType) => (
            <option key={nodeType} value={nodeType}>
              {nodeType}
            </option>
          ))}
        </select>
        <Input
          value={newNodeLabel}
          onChange={(event) => setNewNodeLabel(event.target.value)}
          disabled={!canEdit}
        />
        <Button onClick={handleCreateNode} disabled={!canEdit || isPending}>
          Add node
        </Button>
        <p className="text-sm text-zinc-400">
          {canEdit ? "Owner/Editor mode" : "Viewer mode: editing disabled"}
        </p>
      </div>
      <div className="h-[680px] overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
        <ReactFlow
          nodes={flowNodes}
          edges={flowEdges}
          fitView
          onNodesChange={(changes) => {
            if (!canEdit) return
            applyNodeChanges(changes)
          }}
          onEdgesChange={(changes) => {
            if (!canEdit) return
            applyEdgeChanges(changes)
          }}
          onConnect={(connection: Connection) => {
            const source = connection.source
            const target = connection.target

            if (!canEdit || !source || !target) {
              return
            }

            const optimisticEdge: BoardFlowEdge = {
              id: `temp-${crypto.randomUUID()}`,
              source,
              target,
            }

            setEdges([...edges, optimisticEdge])

            startTransition(async () => {
              await createEdgeAction({
                boardId,
                workspaceId,
                sourceNodeId: source,
                targetNodeId: target,
              })
            })
          }}
          onNodeDragStart={(_, node) => {
            if (!canEdit) return
            startTransition(async () => {
              await lockNodeAction({ boardId, workspaceId, nodeId: node.id })
            })
          }}
          onNodeDrag={(_, node) => {
            if (!canEdit) return
            setNodes(
              nodes.map((current) =>
                current.id === node.id ? { ...current, position: node.position } : current
              )
            )
            throttleMove(node as BoardFlowNode)
          }}
          onNodeDragStop={(_, node) => {
            if (!canEdit) return
            startTransition(async () => {
              await moveNodeAction({
                nodeId: node.id,
                boardId,
                workspaceId,
                position: node.position,
              })
              await unlockNodeAction({ boardId, workspaceId, nodeId: node.id })
            })
          }}
          onNodeDoubleClick={(_, node) => {
            if (!canEdit) return
            const label = window.prompt("Update node label", node.data.label)
            if (!label) return

            const nextNodes = nodes.map((current) =>
              current.id === node.id
                ? { ...current, data: { ...current.data, label } }
                : current
            )
            setNodes(nextNodes)

            startTransition(async () => {
              await updateNodeAction({
                nodeId: node.id,
                boardId,
                workspaceId,
                type: node.data.type,
                label,
              })
            })
          }}
          onNodesDelete={(deletedNodes) => {
            if (!canEdit) return
            for (const node of deletedNodes) {
              startTransition(async () => {
                await deleteNodeAction({ nodeId: node.id, boardId, workspaceId })
              })
            }
          }}
          onEdgeDoubleClick={(_, edge) => {
            if (!canEdit) return
            const label = window.prompt("Update edge label", edge.label?.toString() ?? "")
            if (label === null) return

            setEdges(
              edges.map((current) =>
                current.id === edge.id
                  ? { ...current, label, data: { ...(current.data ?? {}), label } }
                  : current
              )
            )

            startTransition(async () => {
              await updateEdgeAction({
                edgeId: edge.id,
                boardId,
                workspaceId,
                label,
              })
            })
          }}
          onEdgesDelete={(deletedEdges) => {
            if (!canEdit) return
            for (const edge of deletedEdges) {
              startTransition(async () => {
                await deleteEdgeAction({ edgeId: edge.id, boardId, workspaceId })
              })
            }
          }}
        >
          <MiniMap />
          <Controls />
          <Background gap={20} color="#27272a" />
        </ReactFlow>
      </div>
    </div>
  )
}

export function BoardCanvas(props: { boardId: string; workspaceId: string; role: WorkspaceRole }) {
  return (
    <ReactFlowProvider>
      <BoardCanvasInner {...props} />
    </ReactFlowProvider>
  )
}
