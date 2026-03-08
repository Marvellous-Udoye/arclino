"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { createBoardAction } from "@/features/boards/actions/create-board-action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function BoardCreateForm({ workspaceId, canCreate }: { workspaceId: string; canCreate: boolean }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  if (!canCreate) {
    return (
      <div className="rounded-xl border border-dashed border-white/10 p-4 text-sm text-zinc-400">
        Viewers can browse boards and participate in chat, but cannot create new boards.
      </div>
    )
  }

  return (
    <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-4">
      <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Board name" />
      <Textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Optional board description"
      />
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <Button
        disabled={isPending}
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
        {isPending ? "Creating..." : "Create board"}
      </Button>
    </div>
  )
}
