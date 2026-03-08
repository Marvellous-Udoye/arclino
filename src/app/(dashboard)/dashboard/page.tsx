import { redirect } from "next/navigation"
import { BoardCreateForm } from "@/features/boards/components/board-create-form"
import { BoardList } from "@/features/boards/components/board-list"
import { getDashboardData } from "@/features/boards/queries/get-dashboard-data"
import { requireUser } from "@/lib/auth/session"

export default async function DashboardPage() {
  const user = await requireUser("/dashboard")
  const { workspace, boards } = await getDashboardData(user.id)

  if (!workspace) {
    redirect("/onboarding/workspace")
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <BoardCreateForm workspaceId={workspace.id} canCreate={workspace.role !== "viewer"} />
        <div className="rounded-xl border border-white/10 bg-black/30 p-6">
          <h2 className="text-lg font-semibold">{workspace.name}</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Role: {workspace.role}. Open a board to collaborate, chat, and inspect activity.
          </p>
        </div>
      </div>
      <BoardList boards={boards} />
    </div>
  )
}
