import Link from "next/link"
import type { BoardSummary } from "@/types/boards"

export function BoardList({ boards }: { boards: BoardSummary[] }) {
  if (boards.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/10 p-8 text-sm text-zinc-400">
        No boards yet. Create one to start mapping your system.
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {boards.map((board) => (
        <Link
          key={board.id}
          href={`/dashboard/boards/${board.id}`}
          className="rounded-xl border border-white/10 bg-black/30 p-5 transition hover:border-cyan-400/50"
        >
          <div className="space-y-2">
            <h2 className="font-semibold">{board.name}</h2>
            <p className="text-sm text-zinc-400">{board.description || "No description"}</p>
            <p className="text-xs text-zinc-500">
              Updated {new Date(board.updatedAt).toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
