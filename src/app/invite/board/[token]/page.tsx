import { redirect } from "next/navigation"
import { getSafeNextPath } from "@/features/auth/utils/next-path"
import { createClient } from "@/lib/supabase/server"
import { requireUser } from "@/lib/auth/session"

export default async function BoardInvitePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  await requireUser()
  const { token } = await params
  const supabase = await createClient()
  const { data, error } = await supabase.rpc("accept_board_invite", {
    _token: token,
  })

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
        <div className="mx-auto max-w-lg rounded-xl border border-red-500/20 bg-red-500/10 p-6">
          <h1 className="text-xl font-semibold">Invite could not be accepted</h1>
          <p className="mt-3 text-sm text-zinc-300">{error.message}</p>
        </div>
      </div>
    )
  }

  const result = data?.[0]

  if (!result) {
    redirect("/dashboard")
  }

  const notice = result.notice
    ? `?invite-notice=${encodeURIComponent(result.notice)}`
    : ""

  redirect(getSafeNextPath(`/dashboard/boards/${result.board_id}${notice}`))
}
