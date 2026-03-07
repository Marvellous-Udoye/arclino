import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arclino - Real-time flowcharts for teams that ship",
  description:
    "Arclino is a real-time collaborative flowchart workspace for product, engineering, and operations teams.",
};

export default function ExternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <main>{children}</main>
    </div>
  );
}





