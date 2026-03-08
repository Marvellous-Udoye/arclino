import { StubPage } from "@/components/external/stub-page"

export default async function CustomerCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <StubPage
      title={`Case study: ${slug}`}
      description="Case study detail pages are stubbed in v1 while the main investment remains in auth, boards, realtime collaboration, and workspace security."
    />
  )
}
