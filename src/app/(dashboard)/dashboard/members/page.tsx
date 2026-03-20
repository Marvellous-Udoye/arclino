import { redirect } from "next/navigation"
import { InviteManager } from "@/features/invites/components/invite-manager"
import { MemberList } from "@/features/workspace/components/member-list"
import { getWorkspaceMembersData } from "@/features/workspace/queries/get-workspace-members-data"
import { requireUser } from "@/lib/auth/session"

export default async function MembersHubPage() {
  const user = await requireUser("/dashboard/members")
  const { workspace, members, boards, invites } = await getWorkspaceMembersData(user.id)

  if (!workspace) {
    redirect("/onboarding/workspace")
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Page Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Team <span className="text-primary">Collaboration</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Manage your workspace collective and board-specific invitations.
          </p>
        </div>
      </div>

      <div className="grid gap-8">
         <MemberList members={members} currentRole={workspace.role} />
         <InviteManager
            workspaceId={workspace.id}
            boards={boards}
            invites={invites}
            canManage={workspace.role === "owner"}
         />
      </div>
    </div>
  )
}
