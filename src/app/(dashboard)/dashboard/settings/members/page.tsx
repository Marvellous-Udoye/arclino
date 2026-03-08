import { redirect } from "next/navigation"
import { InviteManager } from "@/features/invites/components/invite-manager"
import { MemberList } from "@/features/workspace/components/member-list"
import { getWorkspaceMembersData } from "@/features/workspace/queries/get-workspace-members-data"
import { requireUser } from "@/lib/auth/session"

export default async function MembersSettingsPage() {
  const user = await requireUser("/dashboard/settings/members")
  const { workspace, members, boards, invites } = await getWorkspaceMembersData(user.id)

  if (!workspace) {
    redirect("/onboarding/workspace")
  }

  return (
    <div className="space-y-6">
      <MemberList members={members} currentRole={workspace.role} />
      <InviteManager
        workspaceId={workspace.id}
        boards={boards}
        invites={invites}
        canManage={workspace.role === "owner"}
      />
    </div>
  )
}
