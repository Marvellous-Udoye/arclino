import type { Metadata } from "next";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
