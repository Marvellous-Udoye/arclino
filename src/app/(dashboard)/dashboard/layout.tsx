import type { ReactNode } from "react"
import { DashboardShell } from "@/features/boards/components/dashboard-shell"
import { requireUser } from "@/lib/auth/session"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await requireUser("/dashboard")

  return (
    <DashboardShell title="Workspace" description="Realtime flowboards with workspace-level access control.">
      {children}
    </DashboardShell>
  )
}
