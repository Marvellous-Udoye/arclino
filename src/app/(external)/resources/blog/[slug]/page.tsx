import { StubPage } from "@/components/external/stub-page"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <StubPage
      title={`Blog: ${slug}`}
      description="Individual blog posts are represented as content stubs in this iteration."
    />
  )
}
