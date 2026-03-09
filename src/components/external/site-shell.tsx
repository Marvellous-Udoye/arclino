import Link from "next/link"
import type { ReactNode } from "react"

// const navItems = [
//   { href: "/", label: "Home" },
//   { href: "/solutions", label: "Solutions" },
//   { href: "/customers", label: "Customers" },
//   { href: "/pricing", label: "Pricing" },
//   { href: "/resources", label: "Resources" },
//   { href: "/security", label: "Security" },
// ]

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold">
            Arclino
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/login" className="rounded-md border border-white/10 px-3 py-1.5 text-white">
              Sign in
            </Link>
          </nav>
        </div>
      </header> */}
      {children}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm text-zinc-500">
          <span>Arclino</span>
          <div className="flex gap-4">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
