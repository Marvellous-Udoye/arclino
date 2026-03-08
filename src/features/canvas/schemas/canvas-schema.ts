import { z } from "zod"
import { boardNodeTypes } from "@/types/boards"

const positionSchema = z.object({
  x: z.number(),
  y: z.number(),
})

export const createNodeSchema = z.object({
  boardId: z.uuid(),
  workspaceId: z.uuid(),
  type: z.enum(boardNodeTypes),
  label: z.string().trim().min(1).max(120),
  position: positionSchema,
})

export const updateNodeSchema = z.object({
  nodeId: z.uuid(),
  boardId: z.uuid(),
  workspaceId: z.uuid(),
  type: z.enum(boardNodeTypes),
  label: z.string().trim().min(1).max(120),
})

export const moveNodeSchema = z.object({
  nodeId: z.uuid(),
  boardId: z.uuid(),
  workspaceId: z.uuid(),
  position: positionSchema,
})

export const deleteNodeSchema = z.object({
  nodeId: z.uuid(),
  boardId: z.uuid(),
  workspaceId: z.uuid(),
})

export const createEdgeSchema = z.object({
  boardId: z.uuid(),
  workspaceId: z.uuid(),
  sourceNodeId: z.uuid(),
  targetNodeId: z.uuid(),
  label: z.string().trim().max(120).optional().or(z.literal("")),
})

export const updateEdgeSchema = z.object({
  edgeId: z.uuid(),
  boardId: z.uuid(),
  workspaceId: z.uuid(),
  label: z.string().trim().max(120).optional().or(z.literal("")),
})

export const deleteEdgeSchema = z.object({
  edgeId: z.uuid(),
  boardId: z.uuid(),
  workspaceId: z.uuid(),
})

export const nodeLockSchema = z.object({
  boardId: z.uuid(),
  workspaceId: z.uuid(),
  nodeId: z.uuid(),
})
