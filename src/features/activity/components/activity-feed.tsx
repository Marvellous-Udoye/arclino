"use client"

import { useMemo } from "react"
import { useBoardStore } from "@/stores/board-store"

export function ActivityFeed() {
  const events = useBoardStore((state) => state.events)
  const orderedEvents = useMemo(
    () => [...events].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 50),
    [events]
  )

  return (
    <section className="rounded-xl border border-white/10 bg-black/30">
      <div className="border-b border-white/10 px-4 py-3">
        <h2 className="font-semibold">Activity</h2>
      </div>
      <div className="space-y-3 p-4">
        {orderedEvents.length === 0 ? (
          <p className="text-sm text-zinc-500">No activity yet.</p>
        ) : (
          orderedEvents.map((event) => (
            <div key={event.id} className="rounded-lg border border-white/10 bg-black/40 p-3">
              <p className="text-sm text-white">
                {event.actorName || "Teammate"}: {event.type.replaceAll("_", " ")}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {new Date(event.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
