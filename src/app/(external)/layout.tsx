import type { Metadata } from "next"
import { SiteShell } from "@/components/external/site-shell"

export const metadata: Metadata = {
  title: "Arclino - Real-time flowcharts for teams that ship",
  description:
    "Arclino is a real-time collaborative flowchart workspace for product, engineering, and operations teams.",
}

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SiteShell>{children}</SiteShell>
}
