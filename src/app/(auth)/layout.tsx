import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-zinc-100">
      <div className="absolute inset-0 bg-[url('/assets/auth-bg.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/70" />
      <main className="relative z-10 mx-auto flex min-h-screen max-w-lg items-center px-6 py-16">
        {children}
      </main>
    </div>
  )
}




