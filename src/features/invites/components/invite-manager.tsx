"use client"

import { useMemo, useState, useTransition } from "react"
import { createInviteAction, revokeInviteAction } from "@/features/invites/actions/invite-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InviteManager({
  workspaceId,
  boards,
  invites,
  canManage,
}: {
  workspaceId: string
  boards: Array<{ id: string; name: string }>
  invites: Array<{
    id: string
    boardId: string
    role: "editor" | "viewer"
    token: string
    usesCount: number
    maxUses: number | null
    revokedAt: string | null
    expiresAt: string | null
  }>
  canManage: boolean
}) {
  const [boardId, setBoardId] = useState(boards[0]?.id ?? "")
  const [role, setRole] = useState<"editor" | "viewer">("viewer")
  const [maxUses, setMaxUses] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const inviteRows = useMemo(
    () =>
      invites.map((invite) => ({
        ...invite,
        url: `${appUrl}/invite/board/${invite.token}`,
      })),
    [appUrl, invites]
  )

  return (
    <section className="space-y-4 rounded-xl border border-white/10 bg-black/30 p-4">
      <div>
        <h2 className="font-semibold">Invite links</h2>
        <p className="text-sm text-zinc-400">Owners can create board-level editor or viewer links.</p>
      </div>
      {canManage ? (
        <div className="grid gap-3 md:grid-cols-4">
          <select
            className="rounded-md border border-white/10 bg-zinc-950 px-3 py-2 text-sm"
            value={boardId}
            onChange={(event) => setBoardId(event.target.value)}
          >
            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
          </select>
          <select
            className="rounded-md border border-white/10 bg-zinc-950 px-3 py-2 text-sm"
            value={role}
            onChange={(event) => setRole(event.target.value as "editor" | "viewer")}
          >
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
          </select>
          <Input value={maxUses} onChange={(event) => setMaxUses(event.target.value)} placeholder="Max uses" />
          <Button
            disabled={isPending || !boardId}
            onClick={() =>
              startTransition(async () => {
                setError(null)
                const result = await createInviteAction({
                  boardId,
                  workspaceId,
                  role,
                  maxUses: maxUses ? Number(maxUses) : undefined,
                })

                if (result?.error) {
                  setError(result.error)
                  return
                }

                setMaxUses("")
                window.location.reload()
              })
            }
          >
            {isPending ? "Creating..." : "Create invite"}
          </Button>
        </div>
      ) : (
        <p className="text-sm text-zinc-500">Only owners can manage invite links.</p>
      )}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <div className="space-y-3">
        {inviteRows.length === 0 ? (
          <p className="text-sm text-zinc-500">No invite links yet.</p>
        ) : (
          inviteRows.map((invite) => (
            <div key={invite.id} className="rounded-lg border border-white/10 bg-black/40 p-3">
              <p className="break-all text-sm">{invite.url}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                <span>Role: {invite.role}</span>
                <span>Uses: {invite.usesCount}{invite.maxUses ? ` / ${invite.maxUses}` : ""}</span>
                {invite.revokedAt ? <span>Revoked</span> : null}
              </div>
              {canManage && !invite.revokedAt ? (
                <div className="mt-3">
                  <Button
                    variant="outline"
                    onClick={() =>
                      startTransition(async () => {
                        await revokeInviteAction({ inviteId: invite.id, workspaceId })
                        window.location.reload()
                      })
                    }
                  >
                    Revoke
                  </Button>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
