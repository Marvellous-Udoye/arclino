import { redirect } from "next/navigation"
import { WorkspaceOnboardingForm } from "@/features/workspace/components/workspace-onboarding-form"
import { getCurrentWorkspace } from "@/features/workspace/queries/get-current-workspace"
import { requireUser } from "@/lib/auth/session"

export default async function WorkspaceOnboardingPage() {
  const user = await requireUser("/onboarding/workspace")
  const workspace = await getCurrentWorkspace(user.id)

  if (workspace) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <WorkspaceOnboardingForm />
    </div>
  )
}
