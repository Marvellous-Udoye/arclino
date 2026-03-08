"use server"

import { createMessageSchema } from "@/features/chat/schemas/message-schema"
import { triggerBoardEvent } from "@/features/realtime/utils/trigger-board-event"
import { createBoardEvent } from "@/features/boards/utils/board-events"
import { createClient } from "@/lib/supabase/server"
import { requireUser } from "@/lib/auth/session"

export async function sendMessageAction(input: {
  boardId: string
  workspaceId: string
  body: string
}) {
  const user = await requireUser()
  const parsed = createMessageSchema.safeParse(input)

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid message." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("board_messages")
    .insert({
      board_id: parsed.data.boardId,
      workspace_id: parsed.data.workspaceId,
      user_id: user.id,
      body: parsed.data.body,
    })
    .select("*")
    .single()

  if (error) {
    return { error: error.message }
  }

  await createBoardEvent({
    boardId: parsed.data.boardId,
    workspaceId: parsed.data.workspaceId,
    actorUserId: user.id,
    type: "message_sent",
    payload: { messageId: data.id },
  })

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", user.id)
    .maybeSingle()

  const message = {
    id: data.id,
    boardId: data.board_id,
    workspaceId: data.workspace_id,
    userId: data.user_id,
    body: data.body,
    createdAt: data.created_at,
    authorName: profile?.full_name || profile?.email || null,
  }

  await triggerBoardEvent(parsed.data.boardId, {
    type: "board:chat_message",
    payload: { message },
  })

  return { data: message }
}
