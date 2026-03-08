export function ProfileCard({
  email,
  fullName,
  avatarUrl,
}: {
  email: string
  fullName: string | null
  avatarUrl: string | null
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-6">
      <div className="flex items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-lg font-semibold">
          {fullName?.[0] || email[0]?.toUpperCase()}
        </div>
        <div>
          <p className="text-lg font-semibold">{fullName || "Unnamed user"}</p>
          <p className="text-sm text-zinc-400">{email}</p>
          {avatarUrl ? <p className="mt-1 text-xs text-zinc-500">{avatarUrl}</p> : null}
        </div>
      </div>
    </div>
  )
}
