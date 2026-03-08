"use client"

import { useBoardRealtime } from "@/features/realtime/hooks/use-board-realtime"

export function BoardPresence({ boardId }: { boardId: string }) {
  const { presence } = useBoardRealtime(boardId)

  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <h2 className="mb-3 font-semibold">Presence</h2>
      <div className="flex flex-wrap gap-2">
        {presence.length === 0 ? (
          <p className="text-sm text-zinc-500">No active collaborators.</p>
        ) : (
          presence.map((member) => (
            <div key={member.id} className="rounded-full border border-cyan-400/30 px-3 py-1 text-sm">
              {member.name || member.email}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
