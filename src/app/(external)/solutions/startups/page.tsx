export default function Page({ params }: { params: { slug: string } }) {
  return (
    <main className=\"mx-auto max-w-3xl px-6 py-20 text-zinc-200\">
      <h1 className=\"text-3xl font-semibold text-white\">Page</h1>
      <p className=\"mt-4 text-sm text-zinc-400\">
        Placeholder content for {params.slug}.
      </p>
    </main>
  )
}





