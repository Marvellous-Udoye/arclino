"use client"

import { useMemo, useState, useTransition } from "react"
import { sendMessageAction } from "@/features/chat/actions/send-message-action"
import { useBoardStore } from "@/stores/board-store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function BoardChat({ boardId, workspaceId }: { boardId: string; workspaceId: string }) {
  const messages = useBoardStore((state) => state.messages)
  const [body, setBody] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const orderedMessages = useMemo(
    () => [...messages].sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [messages]
  )

  return (
    <section className="flex h-[680px] flex-col rounded-xl border border-white/10 bg-black/30">
      <div className="border-b border-white/10 px-4 py-3">
        <h2 className="font-semibold">Chat</h2>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {orderedMessages.map((message) => (
          <div key={message.id} className="rounded-lg border border-white/10 bg-black/40 p-3">
            <div className="mb-1 flex items-center justify-between text-xs text-zinc-500">
              <span>{message.authorName || "Teammate"}</span>
              <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
            </div>
            <p className="text-sm text-zinc-100">{message.body}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 p-4">
        <Textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Send a message" />
        {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
        <div className="mt-3 flex justify-end">
          <Button
            disabled={isPending || !body.trim()}
            onClick={() =>
              startTransition(async () => {
                setError(null)
                const result = await sendMessageAction({ boardId, workspaceId, body })

                if (result?.error) {
                  setError(result.error)
                  return
                }

                setBody("")
              })
            }
          >
            {isPending ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </section>
  )
}
