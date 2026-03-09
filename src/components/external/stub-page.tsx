export function StubPage({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-card">
        <div className="border-b border-border px-8 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            External page
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            {description}
          </p>
        </div>
        <div className="grid gap-4 px-8 py-8 md:grid-cols-3">
          {["Cinematic hero", "Tailored sections", "Shared shell"].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-border bg-background/70 p-5 text-sm font-medium text-foreground/80"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
