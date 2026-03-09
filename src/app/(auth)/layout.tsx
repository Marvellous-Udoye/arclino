import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen w-full bg-background text-foreground">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="flex w-full items-center justify-center p-8 lg:w-1/2 lg:p-16">
          <div className="w-full max-w-md">{children}</div>
        </div>

        <div className="relative hidden overflow-hidden bg-muted lg:block lg:w-1/2">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/assets/auth-bg.jpg')] bg-cover bg-center grayscale opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-black/40 to-background/90 mix-blend-multiply" />
          </div>

          <div className="absolute inset-0 flex flex-col items-start justify-end p-20 text-white">
            <div className="max-w-md">
              <div className="mb-8 h-1 w-12 bg-white" />
              <h3 className="mb-6 text-5xl font-black leading-tight tracking-tighter">
                Build systems
                <br />
                your team can
                <span className="italic"> trust.</span>
              </h3>
              <p className="text-lg font-medium leading-relaxed text-white/80">
                Map flows, collaborate live, and keep every board connected to the same secure workspace context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



