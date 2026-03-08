import { z } from "zod"

export const createMessageSchema = z.object({
  boardId: z.uuid(),
  workspaceId: z.uuid(),
  body: z.string().trim().min(1).max(1000),
})
