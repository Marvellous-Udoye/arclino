"use server"

import { revalidatePath } from "next/cache"
import { createBoardSchema } from "@/features/boards/schemas/board-schema"
import { createBoardEvent } from "@/features/boards/utils/board-events"
import { createClient } from "@/lib/supabase/server"
import { requireUser } from "@/lib/auth/session"

export async function createBoardAction(input: {
  workspaceId: string
  name: string
  description?: string
}) {
  const user = await requireUser("/dashboard")
  const parsed = createBoardSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid board input." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("boards")
    .insert({
      workspace_id: parsed.data.workspaceId,
      name: parsed.data.name,
      description: parsed.data.description || null,
      created_by: user.id,
    })
    .select("*")
    .single()

  if (error) {
    return { error: error.message }
  }

  await createBoardEvent({
    boardId: data.id,
    workspaceId: data.workspace_id,
    actorUserId: user.id,
    type: "board_created",
    payload: { boardName: data.name },
  })

  revalidatePath("/dashboard")

  return { data }
}
