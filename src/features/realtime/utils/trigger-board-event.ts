"use server"

import { getPusherServer } from "@/lib/pusher/server"
import type { RealtimeBoardEvent } from "@/types/realtime"

export async function triggerBoardEvent(boardId: string, event: RealtimeBoardEvent) {
  const pusher = getPusherServer()

  await pusher.trigger(`presence-board-${boardId}`, event.type, event.payload)
}
