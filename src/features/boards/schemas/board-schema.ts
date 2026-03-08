import { z } from "zod"

export const createBoardSchema = z.object({
  workspaceId: z.uuid(),
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().max(240).optional().or(z.literal("")),
})

export const updateBoardSchema = z.object({
  boardId: z.uuid(),
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().max(240).optional().or(z.literal("")),
})
