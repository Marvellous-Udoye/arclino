import { z } from "zod"

export const createInviteSchema = z.object({
  boardId: z.uuid(),
  workspaceId: z.uuid(),
  role: z.enum(["editor", "viewer"]),
  maxUses: z.coerce.number().int().positive().optional(),
  expiresAt: z.string().datetime().optional().or(z.literal("")),
})

export const revokeInviteSchema = z.object({
  inviteId: z.uuid(),
  workspaceId: z.uuid(),
})
