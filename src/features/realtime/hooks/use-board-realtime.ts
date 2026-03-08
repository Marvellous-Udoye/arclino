"use client"

import { useEffect, useState } from "react"
import { getPusherClient } from "@/lib/pusher/client"
import { useBoardStore } from "@/stores/board-store"
import type { PresenceMember, RealtimeBoardEvent } from "@/types/realtime"

export function useBoardRealtime(boardId: string) {
  const applyRealtimeEvent = useBoardStore((state) => state.applyRealtimeEvent)
  const [presence, setPresence] = useState<PresenceMember[]>([])

  useEffect(() => {
    const pusher = getPusherClient()
    const channel = pusher.subscribe(`presence-board-${boardId}`)
    const syncPresence = () => {
      const members = (channel as { members?: { each: (cb: (member: { id: string; info: PresenceMember }) => void) => void } }).members
      if (!members) {
        return
      }

      const next: PresenceMember[] = []
      members.each((member) => {
        const info = member.info ?? { name: "", email: "" }
        next.push({
          id: member.id,
          name: info.name,
          email: info.email,
        })
      })
      setPresence(next)
    }

    channel.bind("pusher:subscription_succeeded", syncPresence)
    channel.bind("pusher:member_added", syncPresence)
    channel.bind("pusher:member_removed", syncPresence)

    const eventNames: RealtimeBoardEvent["type"][] = [
      "board:node_created",
      "board:node_updated",
      "board:node_moved",
      "board:node_deleted",
      "board:edge_created",
      "board:edge_updated",
      "board:edge_deleted",
      "board:chat_message",
      "board:node_lock",
      "board:node_unlock",
    ]

    for (const eventName of eventNames) {
      channel.bind(eventName, (payload: RealtimeBoardEvent["payload"]) => {
        applyRealtimeEvent({
          type: eventName,
          payload,
        } as RealtimeBoardEvent)
      })
    }

    return () => {
      for (const eventName of eventNames) {
        channel.unbind(eventName)
      }
      channel.unbind("pusher:subscription_succeeded", syncPresence)
      channel.unbind("pusher:member_added", syncPresence)
      channel.unbind("pusher:member_removed", syncPresence)
      pusher.unsubscribe(`presence-board-${boardId}`)
    }
  }, [applyRealtimeEvent, boardId])

  return { presence }
}
