"use client"

import { useMemo, useState, useTransition } from "react"
import { createInviteAction, revokeInviteAction } from "@/features/invites/actions/invite-actions"
import { Button } from "@/components/ui/button"
import { Link2, Copy, Trash2, Zap, UserPlus } from "lucide-react"
import { toast } from "react-hot-toast"

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

  const copyToClipboard = (url: string) => {
     navigator.clipboard.writeText(url)
     toast.success("Invite link copied")
  }

  return (
    <section className="rounded-[2.5rem] border border-border bg-card/40 p-8 backdrop-blur-sm shadow-xl shadow-primary/5">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Invite Links</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Create temporary or persistent access links for specific collaborative boards.
          </p>
        </div>

        {canManage && (
          <div className="flex flex-wrap items-center gap-3">
             <div className="flex items-center gap-2 rounded-xl bg-background/50 border border-border/50 p-1 pl-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Board</span>
                <select
                  className="bg-transparent px-2 py-1.5 text-xs font-bold text-foreground outline-none cursor-pointer"
                  value={boardId}
                  onChange={(event) => setBoardId(event.target.value)}
                >
                  {boards.map((board) => (
                    <option key={board.id} value={board.id}>{board.name}</option>
                  ))}
                </select>
             </div>
             <div className="flex items-center gap-2 rounded-xl bg-background/50 border border-border/50 p-1 pl-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Role</span>
                <select
                  className="bg-transparent px-2 py-1.5 text-xs font-bold text-foreground outline-none cursor-pointer"
                  value={role}
                  onChange={(event) => setRole(event.target.value as "editor" | "viewer")}
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                </select>
             </div>
             <Button
                disabled={isPending || !boardId}
                className="rounded-xl font-bold shadow-lg shadow-primary/20"
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
                <UserPlus className="mr-2 size-4" /> Generate
              </Button>
          </div>
        )}
      </div>

      {error ? <p className="mb-4 text-xs font-bold text-destructive px-1">{error}</p> : null}

      <div className="grid gap-4 md:grid-cols-2">
        {inviteRows.length === 0 ? (
          <div className="col-span-2 flex min-h-[150px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-background/30 text-center">
             <Link2 className="size-8 text-muted-foreground/30 mb-2" />
             <p className="text-sm font-medium text-muted-foreground">No active invite links.</p>
          </div>
        ) : (
          inviteRows.map((invite) => (
            <div 
              key={invite.id} 
              className={`relative overflow-hidden rounded-2xl border bg-background/50 p-5 transition-all shadow-sm ${invite.revokedAt ? 'opacity-50 grayscale border-border' : 'border-border/50 hover:border-primary/30'}`}
            >
              <div className="flex items-start justify-between mb-4">
                 <div className="flex items-center gap-3">
                    <div className={`flex size-10 items-center justify-center rounded-xl ${invite.role === 'editor' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
                       <Zap className="size-5" />
                    </div>
                    <div>
                       <p className="text-xs font-black uppercase tracking-widest text-foreground leading-none">
                         {invite.role} Access
                       </p>
                       <p className="text-[10px] font-bold text-muted-foreground mt-1">
                          {invite.usesCount} {invite.maxUses ? `/ ${invite.maxUses}` : ""} uses utilized
                       </p>
                    </div>
                 </div>
                 {!invite.revokedAt && canManage && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                      onClick={() =>
                        startTransition(async () => {
                          await revokeInviteAction({ inviteId: invite.id, workspaceId })
                          window.location.reload()
                        })
                      }
                    >
                      <Trash2 className="size-4" />
                    </Button>
                 )}
              </div>
              
              <div className="flex items-center gap-2 rounded-xl bg-card border border-border/50 p-2 pl-4">
                 <p className="truncate text-[10px] font-mono font-medium text-muted-foreground flex-1">
                    {invite.url}
                 </p>
                 <Button
                    variant="secondary"
                    size="icon"
                    className="size-8 rounded-lg bg-background hover:bg-muted"
                    onClick={() => copyToClipboard(invite.url)}
                 >
                    <Copy className="size-3.5" />
                 </Button>
              </div>
              
              {invite.revokedAt && (
                <div className="absolute top-2 right-2 rounded-full bg-destructive/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-destructive">
                   Revoked
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
