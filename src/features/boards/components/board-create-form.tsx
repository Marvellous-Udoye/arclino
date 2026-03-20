"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { createBoardAction } from "@/features/boards/actions/create-board-action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Loader2 } from "lucide-react"

export function BoardCreateForm({ workspaceId, canCreate }: { workspaceId: string; canCreate: boolean }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  if (!canCreate) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card/20 p-6 text-center text-sm text-muted-foreground">
        Viewers can browse boards but cannot create new ones.
      </div>
    )
  }

  return (
    <div className="space-y-5 rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-primary/5">
      <div className="flex items-center gap-3">
         <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="size-5" />
         </div>
         <div>
            <h3 className="font-bold text-foreground leading-none">New Canvas</h3>
            <p className="text-xs text-muted-foreground mt-1">Deploy a new shared board.</p>
         </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Board Title</label>
          <Input 
            value={name} 
            onChange={(event) => setName(event.target.value)} 
            placeholder="e.g. Infrastructure Map" 
            className="h-11 rounded-xl bg-background border-border/50 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Context / Description</label>
          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What is the purpose of this board?"
            className="min-h-[100px] rounded-xl bg-background border-border/50 focus:ring-primary/20 resize-none"
          />
        </div>
      </div>

      {error ? <p className="text-xs font-bold text-destructive px-1">{error}</p> : null}
      
      <Button
        disabled={isPending || !name}
        className="h-12 w-full rounded-xl font-bold transition-all hover:scale-[1.02]"
        onClick={() =>
          startTransition(async () => {
            setError(null)
            const result = await createBoardAction({ workspaceId, name, description })

            if (result?.error) {
              setError(result.error)
              return
            }

            setName("")
            setDescription("")
            router.refresh()
          })
        }
      >
        {isPending ? (
          <><Loader2 className="mr-2 size-4 animate-spin" /> Deploying...</>
        ) : (
          "Create Board"
        )}
      </Button>
    </div>
  )
}
