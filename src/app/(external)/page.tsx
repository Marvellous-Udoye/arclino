import Link from "next/link"

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-8 rounded-3xl border border-white/10 bg-black/30 p-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-cyan-400/30 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
            Realtime flowchart workspace
          </span>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white">
            Flowboards with workspace access control, chat, activity, and live presence.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-400">
            Arclino ships a minimal marketing surface and a protected collaboration app built on Next.js, Supabase, Pusher, and React Flow.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="rounded-md bg-cyan-400 px-4 py-2 font-medium text-black">
              Start with email
            </Link>
            <Link href="/login" className="rounded-md border border-white/10 px-4 py-2 font-medium text-white">
              Sign in
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <div className="space-y-3 text-sm text-zinc-300">
            <p>Core v1 ships:</p>
            <ul className="space-y-2 text-zinc-400">
              <li>Workspace roles: Owner, Editor, Viewer</li>
              <li>Persistent nodes, edges, chat, and activity</li>
              <li>Pusher presence, soft locks, throttled movement sync</li>
              <li>Invite links with strict RLS-backed access</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
