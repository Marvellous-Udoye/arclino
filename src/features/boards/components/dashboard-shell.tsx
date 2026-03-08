import Link from "next/link"
import { signOutAction } from "@/features/auth/actions/sign-out-action"
import type { ReactNode } from "react"

export function DashboardShell({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="border-b border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <Link href="/dashboard" className="text-lg font-semibold">
              Arclino
            </Link>
            <p className="text-sm text-zinc-400">{description}</p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/dashboard">Boards</Link>
            <Link href="/dashboard/settings/members">Members</Link>
            <Link href="/dashboard/settings/profile">Profile</Link>
            <form action={signOutAction}>
              <button type="submit" className="text-zinc-400 hover:text-white">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
        {children}
      </main>
    </div>
  )
}
