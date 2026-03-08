import type { WorkspaceMember, WorkspaceRole } from "@/types/workspace"

export function MemberList({
  members,
  currentRole,
}: {
  members: WorkspaceMember[]
  currentRole: WorkspaceRole
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="mb-4">
        <h2 className="font-semibold">Workspace members</h2>
        <p className="text-sm text-zinc-400">
          Roles are workspace-wide. Current role: {currentRole}
        </p>
      </div>
      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 p-3">
            <div>
              <p className="font-medium">
                {member.profile?.fullName || member.profile?.email || member.userId}
              </p>
              <p className="text-sm text-zinc-500">{member.profile?.email}</p>
            </div>
            <span className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs uppercase tracking-wide text-cyan-200">
              {member.role}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
