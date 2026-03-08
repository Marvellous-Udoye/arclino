export function StubPage({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <div className="rounded-2xl border border-white/10 bg-black/30 p-10">
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">{description}</p>
      </div>
    </main>
  )
}
