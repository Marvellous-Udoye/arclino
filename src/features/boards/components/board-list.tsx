import Link from "next/link"
import type { BoardSummary } from "@/types/boards"
import { Clock, MessageSquare, ArrowUpRight } from "lucide-react"

export function BoardList({ boards }: { boards: BoardSummary[] }) {
  if (boards.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-border bg-card/20 p-12 text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
           <Clock className="size-8" />
        </div>
        <h3 className="text-xl font-bold text-foreground">No boards found</h3>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed">
          It looks like there are no collaborative canvases in this workspace yet. Create one to start mapping.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {boards.map((board) => (
        <Link
          key={board.id}
          href={`/dashboard/boards/${board.id}`}
          className="group relative flex flex-col rounded-[2rem] border border-border bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/60 hover:shadow-2xl hover:shadow-primary/5"
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <span className="text-lg font-black uppercase">{board.name[0]}</span>
            </div>
            <div className="flex size-10 items-center justify-center rounded-full border border-border opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-primary-foreground">
               <ArrowUpRight className="size-4" />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {board.name}
            </h2>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {board.description || "No description provided for this board."}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-4">
             <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span className="flex items-center gap-1.5">
                   <Clock className="size-3" />
                   {new Date(board.updatedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1.5">
                   <MessageSquare className="size-3" />
                   Active
                </span>
             </div>
             <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="size-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
             </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
