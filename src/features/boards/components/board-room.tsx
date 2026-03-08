"use client"

import { useEffect } from "react"
import { BoardCanvas } from "@/features/canvas/components/board-canvas"
import { BoardChat } from "@/features/chat/components/board-chat"
import { ActivityFeed } from "@/features/activity/components/activity-feed"
import { BoardPresence } from "@/features/realtime/components/board-presence"
import { useBoardStore } from "@/stores/board-store"
import type { BoardRoomData } from "@/types/boards"

export function BoardRoom({
  data,
  inviteNotice,
}: {
  data: BoardRoomData
  inviteNotice?: string | null
}) {
  const hydrate = useBoardStore((state) => state.hydrate)

  useEffect(() => {
    hydrate({
      boardId: data.board.id,
      role: data.workspaceRole,
      nodes: data.nodes,
      edges: data.edges,
      messages: data.messages,
      events: data.events,
    })
  }, [data, hydrate])

  return (
    <div className="space-y-6">
      {inviteNotice ? (
        <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-100">
          {inviteNotice}
        </div>
      ) : null}
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <BoardCanvas
          boardId={data.board.id}
          workspaceId={data.board.workspaceId}
          role={data.workspaceRole}
        />
        <BoardChat boardId={data.board.id} workspaceId={data.board.workspaceId} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
        <BoardPresence boardId={data.board.id} />
        <ActivityFeed />
      </div>
    </div>
  )
}
