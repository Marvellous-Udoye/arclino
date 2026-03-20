import type { ReactNode } from "react"
import { DashboardShell } from "@/features/boards/components/dashboard-shell"
import { getDashboardData } from "@/features/boards/queries/get-dashboard-data"
import { getProfile } from "@/features/auth/queries/get-profile"
import { requireUser } from "@/lib/auth/session"
import { redirect } from "next/navigation"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireUser("/dashboard")
  const [{ workspace, boards }, profile] = await Promise.all([
    getDashboardData(user.id),
    getProfile(user.id),
  ])

  if (!workspace) {
    redirect("/onboarding/workspace")
  }

  return (
    <DashboardShell
      user={{
        name:
          profile?.full_name ||
          user.user_metadata?.full_name ||
          user.email?.split("@")[0] ||
          "Workspace user",
        email: profile?.email || user.email || "Unknown email",
        avatar: profile?.avatar_url || "",
      }}
      workspace={{
        name: workspace.name,
        role: workspace.role,
      }}
      boards={boards.map((board) => ({
        id: board.id,
        name: board.name,
      }))}
    >
      {children}
    </DashboardShell>
  )
}
