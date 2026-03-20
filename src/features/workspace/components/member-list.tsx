import type { WorkspaceMember, WorkspaceRole } from "@/types/workspace"
import { Mail, ShieldCheck } from "lucide-react"

export function MemberList({
  members,
  currentRole,
}: {
  members: WorkspaceMember[]
  currentRole: WorkspaceRole
}) {
  return (
    <section className="rounded-[2rem] border border-border bg-card/40 p-8 backdrop-blur-sm shadow-xl shadow-primary/5">
      <div className="mb-10 flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Workspace Members</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Manage who has access to the <span className="text-foreground font-bold">Arclino</span> workspace.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2">
           <ShieldCheck className="size-4 text-primary" />
           <span className="text-[10px] font-black uppercase tracking-widest text-primary">Your Role: {currentRole}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {members.map((member) => (
          <div 
            key={member.id} 
            className="group flex items-center justify-between rounded-2xl border border-border/50 bg-background/50 p-4 transition-all hover:border-primary/30 hover:bg-background shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-primary shadow-sm group-hover:scale-105 transition-transform">
                <span className="text-sm font-black uppercase">
                  {(member.profile?.fullName?.[0] || member.profile?.email?.[0] || "?")}
                </span>
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold text-foreground leading-tight">
                  {member.profile?.fullName || "Active Member"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                   <Mail className="size-3 text-muted-foreground" />
                   <p className="truncate text-xs text-muted-foreground">{member.profile?.email || "No email"}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
               <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary">
                 {member.role}
               </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
